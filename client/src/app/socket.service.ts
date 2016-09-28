import {Injectable, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import * as io from 'socket.io-client';
import {EVENTS} from '../../../shared/events'
import {IWeatherDates} from '../../../shared/weather.interface'

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  onWeatherUpdate: Subject<IWeatherDates[][]>;

  constructor() {
    this.onWeatherUpdate = new Subject<IWeatherDates[][]>();
    this.socket = io.connect();
    this.registerReload();
    this.registerWeatherUpdate();
  }

  private registerReload() {
    this.socket.on(EVENTS.reload, () => {
      console.log('App updated, reloading');
      window.location.reload()
    });
  }

  private registerWeatherUpdate() {
    this.socket.on(EVENTS.weather, (data: IWeatherDates[][]) => {
      this.onWeatherUpdate.next(data);
    })
  }
}
