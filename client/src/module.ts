import {NgModule, LOCALE_ID} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app/app.component'
import {TimeComponent} from './app/time/time.component'
import {WeatherComponent} from './app/weather/weather.component'
import {SocketService} from './app/socket.service';

@NgModule({
    declarations: [ AppComponent, TimeComponent, WeatherComponent],
    imports: [ BrowserModule],
    providers: [SocketService, {provide: LOCALE_ID, useValue: 'sv-SE'}],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
