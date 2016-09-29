import {NgModule, LOCALE_ID} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app/app.component'
import {TimeComponent} from './app/time/time.component'
import {WeatherComponent} from './app/weather/weather.component'
import {SocketService} from './app/shared/socket.service';
import {ReverseSlicePipe} from './app/shared/reverse-slice.pipe';
import {CapitalizePipe} from './app/shared/capitalize.pipe';
import {ToFixedPipe} from './app/shared/slice.pipe';

@NgModule({
    declarations: [ AppComponent, TimeComponent, WeatherComponent, ToFixedPipe, ReverseSlicePipe, CapitalizePipe],
    imports: [ BrowserModule],
    providers: [SocketService, {provide: LOCALE_ID, useValue: 'sv-SE'}],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
