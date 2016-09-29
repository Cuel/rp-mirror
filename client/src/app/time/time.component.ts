import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

@Component({
    selector: 'rp-time',
    template: `
      <article>
        <h4>{{date | date : 'fullDate' | reverseSlice:5 | capitalize}}</h4>
        <h1>{{time}}</h1>
      </article>
    `,
    styles: [`
      article {margin: 2em 2em 0 0;}
      h4, h1 {margin: 0; text-align: center;}
      h4 {font-size: 180%;}
      h1 {margin-top: 0.2em; font-size: 300%;}
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimeComponent {
    private _date: Date;

    constructor(private _cd: ChangeDetectorRef) {
        this._date = new Date();
        setInterval(() => this.update(), 1000);
    }

    update() {
        this._date = new Date();
        this._cd.markForCheck();
    }

    get date() {
        return this._date;
    }

    get time() {
        return this._date.toLocaleTimeString().slice(0, 5);
    }
}
