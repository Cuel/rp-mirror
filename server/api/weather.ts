import { EventEmitter } from 'events';
import { IWeatherJson } from '../../shared/weather.interface'

export interface IWeatherCallback {
    (data: IWeatherJson): void;
}

const fnMap = new Map<string, Function>();
const emit = (data: IWeatherJson) => fnMap.forEach(v => {
    if (v instanceof Function) v(data);
});

let updaterExist = false;
let cached = null;
export function registerWeatherUpdater(): IWeatherCallback {
    if (updaterExist) throw new Error('Weather handler already registered');
    updaterExist = true;
    return function updater(data: IWeatherJson): void {
        cached = data;
        emit(data);
    }
}

export function registerOnWeatherUpdate(id: string, callback: IWeatherCallback): boolean {
    if (fnMap.has(id)) return false;
    fnMap.set(id, callback);
    if (cached) callback(cached);
    return true;
}

export function unregisterOnWeatherUpdate(id: string): boolean {
    if (!fnMap.has(id)) return false;
    fnMap.delete(id);
    return true;
}
