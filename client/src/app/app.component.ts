import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import {SocketService} from './socket.service'

@Component({
    selector: 'my-app',
    template: `
      <section class="pure-g">
        <rp-weather class="pure-u-1-2 half-height"></rp-weather>
        <rp-time class="pure-u-1-2 half-height"></rp-time>
        <div class="pure-u-1 half-height"><h1></h1></div>
      </section>
    `,
    styles: [require('./app.css')]
})

export class AppComponent {
  constructor(_ss: SocketService) {
  }
}
