export interface IWeatherJson {
    location: string;
    weather: IWeatherDates[][];
}

export interface IWeatherDates {
    date: Date;
    temperature?: number;
    windDirection?: string;
    windSpeed?: number;
    humidity?: number;
    weatherSymbol?: number;
}
