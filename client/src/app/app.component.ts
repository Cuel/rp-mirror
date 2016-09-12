import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
    selector: 'my-app',
    template: `
      <section class="pure-g">
        <div class="pure-u-1-2 half-height"><h1>Hi</h1></div>
        <rp-time class="pure-u-1-2 half-height"><h1>Hi</h1></rp-time>
        <div class="pure-u-1 half-height"><h1>Hi</h1></div>
      </section>
    `,
    styles: [require('./app.css')]
})

export class AppComponent {
    constructor() {
        const sock = io.connect()
        let reloading = false;
        sock.on('reload', () => {
          if (reloading) return;
          reloading = true;
          window.location.reload()
        });
    }
}
