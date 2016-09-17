import { EventEmitter } from 'events';
import { IWeatherDates } from '../../shared/weather.interface'

export interface IWeatherCallback {
    (dates: IWeatherDates): void;
}
const emit = (data: IWeatherDates) => weatherEmitter.emit(WEATHER, data);

export function registerWeatherHandler(fn: any) {

}
