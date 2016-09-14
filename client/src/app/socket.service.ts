import {Injectable, EventEmitter} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;

  onReload = new EventEmitter();

  constructor() {
    this.socket = io.connect();
    this.registerReload();
  }

  private registerReload() {
    this.socket.on('reload', () => {
      console.log('App updated, reloading');
      window.location.reload()
    });
  }
}
