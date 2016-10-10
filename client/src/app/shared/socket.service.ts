import {Injectable, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import * as io from 'socket.io-client';
import {EVENTS} from '../../../../shared/events'
import {IWeatherJson, IWeatherDates} from '..././../../shared/weather.interface'

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  onWeatherUpdate: Subject<IWeatherJson>;

  constructor() {
    this.onWeatherUpdate = new Subject<IWeatherJson>();
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
    this.socket.on(EVENTS.weather, (data: IWeatherJson) => {
      this.onWeatherUpdate.next(data);
    })
  }
}
