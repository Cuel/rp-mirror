import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
      <div class="pure-g">
        <div class="pure-u-1-2 half-height"><h1>Hi</h1></div>
        <div class="pure-u-1-2 half-height"><h1>Hi</h1></div>
        <div class="pure-u-1 half-height"><h1>Hi</h1></div>
      </div>
    `,
    styles: [require('./component.css')]
})

export class AppComponent {
}
