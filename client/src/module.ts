import {NgModule, LOCALE_ID} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app/app.component'
import {TimeComponent} from './app/time/time.component'

@NgModule({
    declarations: [ AppComponent, TimeComponent  ],
    imports:      [ BrowserModule],
    providers: [{provide: LOCALE_ID, useValue: 'sv-SE'}],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
