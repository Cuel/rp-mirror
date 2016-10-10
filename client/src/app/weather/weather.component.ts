import {Component} from '@angular/core';
import {SocketService} from '../shared/socket.service';
import {IWeatherJson, IWeatherDates} from '../../../../shared/weather.interface'

interface IWeather extends IWeatherDates {
    weatherIcon: string;
}

@Component({
    selector: 'rp-weather',
    template: `
<article *ngIf="weather">
    <section class="day" *ngFor="let date of weather; let i = index">
        <div class="pure-g" *ngIf="i == 0">
            <h4 class="pure-u-1">{{location}}</h4>
            <div [ngClass]="idx > 0 && idx % 2 == 0 ? 'pure-u-1-12' : 'pure-u-1'" *ngFor="let hour of date; let idx = index">
                <div class="pure-g now" *ngIf="idx == 0">
                    <div class="pure-u-2-5">
                        <i class="wi" [ngClass]="hour.weatherIcon"></i>
                        <span class="temp">{{hour.temperature | toFixed:0}}</span>
                        <sup class="celsius">°C</sup>
                    </div>
                    <div class="pure-u-3-5">
                        <ul>
                            <li>vind: {{hour.windSpeed | toFixed:0}} m/s</li>
                            <li>fuktighet: {{hour.humidity}}%</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</article>
`,
    styles: [`
        article {margin: 2em 0 0 2em;}
        h4 {margin: 0; font-size: 170%;}
        .now > div {display: flex; align-items: baseline;}
        .now .wi {font-size: 280%;}
        .now .temp  {margin-left: 0.4em;font-size: 300%;}
        .now .celsius {font-size: 100%; top: -1.4em;}
        .now ul {list-style-type: none; padding-left: 2.4em; margin: 0.4em 0;}
        .now ul > li {margin: 0.2em 0;}
    `]
})

export class WeatherComponent {
    now: Date;
    location: string;
    weather: IWeather[][];

    constructor(_socketService: SocketService) {
        _socketService.onWeatherUpdate.subscribe(this.onWeatherUpdate.bind(this));
        this.now = new Date();
        setInterval(() => this.now = new Date(), 60 * 1000);
    }

    convertTime(d: Date) {
        return d.toLocaleTimeString().slice(0, 2);
    }

    onWeatherUpdate(data: IWeatherJson) {
        this.location = data.location;
        this.weather = data.weather.map(IWArr => {
            return IWArr.map(v => {
                return this.setupWeatherDate(v);
            })
        });
    }

    formatHour(d: Date) {
        const h = d.getHours();
        return h < 10 ? `0${h}:00` : `${h}:00`;
    }

    private setupWeatherDate(d: IWeatherDates): IWeather {
        const ret = Object.assign({}, d);
        ret.date = new Date(ret.date);
        ret.weatherIcon = this.buildWeatherIcon(ret.date, ret.weatherSymbol);
        return ret;
    }

    buildWeatherIcon(d: Date, weatherSymbol: number) {
        const h = d.getHours();
        const isDay = h > 6 && h < 22;
        const icon = this.getWeatherSymbolIcon(weatherSymbol);
        return `wi-${isDay ? icon.day : icon.night}`;
    }

    getWeatherSymbolIcon(weatherSymbol: number) {
        const ret = {
            1: {day: 'day-sunny', night: 'night-clear'},
            2: {day: 'day-cloudy', night: 'night-alt-cloudy'},
            3: {day: 'day-cloudy', night: 'night-alt-cloudy'},
            4: {day: 'day-cloudy', night: 'night-alt-cloudy'},
            5: {day: 'cloud', night: 'night-alt-cloudy'},
            6: {day: 'cloudy', night: 'night-alt-cloudy'},
            7: {day: 'day-fog', night: 'night-fog'},
            8: {day: 'day-sprinkle', night: 'night-alt-sprinkle'},
            9: {day: 'day-lightning', night: 'night-alt-lightning'},
            10: {day: 'day-sleet', night: 'night-alt-sleet'},
            11: {day: 'day-snow', night: 'night-alt-snow'},
            12: {day: 'day-rain', night: 'night-alt-rain'},
            13: {day: 'day-lightning', night: 'night-alt-lightning'},
            14: {day: 'day-sleet', night: 'night-alt-sleet'},
            15: {day: 'day-snow', night: 'night-snow'},
        };
        if (!ret.hasOwnProperty(weatherSymbol)) {
            console.error('Unknown weatherSymbol %s', weatherSymbol);
            return 'na';
        }
        return ret[weatherSymbol];
    }
}
