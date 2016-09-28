import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import {SocketService} from './socket.service'

@Component({
    selector: 'my-app',
    template: `
      <section class="pure-g">
        <rp-weather class="pure-u-16-24 half-height"></rp-weather>
        <rp-time class="pure-u-8-24 half-height"></rp-time>
        <div class="pure-u-1 half-height">
          <div class="pure-u-1 greeting"><h1>Hej!</h1></div>
        </div>
      </section>
    `,
    styles: [require('./app.css')]
})

export class AppComponent {
  constructor(_ss: SocketService) {
  }
}
