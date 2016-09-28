import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'rp-time',
    template: `
      <article>
        <h4>{{date | date : 'fullDate'}}</h4>
        <h1>{{time}}</h1>
      </article>
    `,
    styles: [`
      article {margin: 1em 2em 0 0;}
      h4, h1 {margin: 0; text-align: right;}
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
