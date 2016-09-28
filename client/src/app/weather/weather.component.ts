import { Component } from '@angular/core';
import { SocketService} from '../socket.service';
import { IWeatherDates } from '../../../../shared/weather.interface'

interface IWeather extends IWeatherDates {
  date: Date;
  weatherIcon: string;
}

@Component({
    selector: 'rp-weather',
    template: `
      <article *ngIf="weather">
        <section class="day" *ngFor="let date of weather">
            <div class="hour" *ngFor="let hour of date">
              <i class="wi" [ngClass]="hour.weatherIcon"></i>
              <p>{{convertTime(hour.date)}}</p>
            </div>
          </section>
      </article>
    `,
    styles: [`
      :host {font-size: 180%;}
      article {margin: 1em 0 0 1em;}
      .day {display: flex; flex-direction: row; flex-wrap: wrap;}
      .hour {display: flex; height: 64px; width: 3em; flex-direction: column; align-items: center;}
      .hour p {font-size: 60%; margin-top: 0.4em; flex-grow: 2;}
      .hour i {font-size: 1em; width: 1em; flex-grow: 1; text-align: center;}
    `]
})

export class WeatherComponent {
    weather: IWeather[][];

    constructor(_socketService: SocketService) {
        _socketService.onWeatherUpdate.subscribe(this.onWeatherUpdate.bind(this));
    }

    convertTime(d: Date) {
      return d.toLocaleTimeString().slice(0,2);
    }

    onWeatherUpdate(data: IWeatherDates[][]) {
      this.weather = [data.map(IWArr => {
        return IWArr.map(v => {
          return this.setupWeatherDate(v);
        })
      }).shift()];
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
