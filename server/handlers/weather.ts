const compose: any = require('lodash.flow');
const unirest: any = require('unirest');
import { IWeatherDates } from '../../shared/weather.interface';
import { registerWeatherUpdater } from '../api/weather';

interface ISmhiWeaherSeries {
    validTime: string;
    parameters: [{
        name: string;
        values: number[];
    }]
}

const URL_PREFIX = 'http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/';
const URL_SUFFIX = '/data.json';
const KUNGSHOLMEN = 'lon/18.01/lat/59.33';

function buildUrl(url: string): string {
    return `${URL_PREFIX}${url}${URL_SUFFIX}`;
}

function getAndConvertSmhiWeatherData() {
    return new Promise((resolve, reject) => {
        unirest.get(buildUrl(KUNGSHOLMEN))
            .end((response) => {
                if (response.ok && response.body) {
                    const t: ISmhiWeaherSeries[] = response.body.timeSeries;
                    resolve(cleanSmhiData(t));
                } else {
                    reject(response.error);
                }
            })
    })

}

function filterPreviousHours(timeSeries: ISmhiWeaherSeries[]) {
    const now = new Date();
    const idx = timeSeries.findIndex(v => new Date(v.validTime) >= now);
    return timeSeries.slice(idx - 1);
}

function limitToFourDays(timeSeries: ISmhiWeaherSeries[]) {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    date.setHours(22);
    date.setMinutes(59);

    const idx = timeSeries.findIndex(v => new Date(v.validTime) >= date);
    return timeSeries.slice(0, idx);
}

function convertTimeSeries(timeSeries: ISmhiWeaherSeries[]): IWeatherDates[] {
    const valueMap = {
        't': 'temperature',
        'wd': 'windDirection',
        'ws': 'windSpeed',
        'r': 'humidity',
        'wsymb': 'weatherSymbol'
    };

    return timeSeries.map(v => {
        const ret: IWeatherDates = { date: new Date(v.validTime) };
        v.parameters
            .filter(v => {
                const n = (v.name || '').toLowerCase();
                return n ? valueMap.hasOwnProperty(n) : false;
            })
            .forEach(v => ret[valueMap[v.name.toLowerCase()]] = v.values[0]);
        return ret;
    })
}

function nestByDay(timeSeries: IWeatherDates[]): IWeatherDates[][] {
    const ret = [];
    let arr = []
    let item = timeSeries.shift();
    let curDay: Date = item.date;

    do {
        const d: Date = item.date;
        if (isSameDay(curDay, d)) {
            arr.push(item);
        } else {
            curDay = d;
            ret.push([...arr]);
            arr = [item];
        }
    } while (item = timeSeries.shift());
    return ret;
}

function isSameDay(date1: Date, date2: Date) {
    const ret =
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
    return ret;
}

const cleanSmhiData = compose([
    filterPreviousHours,
    limitToFourDays,
    convertTimeSeries,
    nestByDay
]);

export function init(delay: number) {
    const updater = registerWeatherUpdater();

    function get() {
        getAndConvertSmhiWeatherData()
            .then((data: IWeatherDates[][]) => updater(data))
            .catch(e => console.error(e));
    }
    get()

    setInterval(get, delay);
}
