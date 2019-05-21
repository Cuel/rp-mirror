import * as R from 'ramda'
import xmlToJson from './xml2json'

export interface WeatherData {
  sunrise?: {
    rise: string
    set: string
  }
  weather?: Weather[]
}

interface Weather {
  forecast: {
    from: string
    to: string
    period: string
  }
  symbol: {
    number: string
    numberEx: string
    name: string
    var: string
  }
  temperature: {
    unit: string
    value: string
  }
  windDirection: {
    deg: string
    code: string
    name: string
  }
  windSpeed: {
    mps: string
    name: string
  }
}

const attrs = R.prop('@attributes')

const pickWeather = R.curry((value: object) => ({
  sunrise: attrs(R.pathOr({}, ['weatherdata', 'sun'], value)),
  weather: R.pathOr(
    [],
    ['weatherdata', 'forecast', 'tabular', 'time'],
    value
  ).map((period: object) => ({
    forecast: attrs(period),
    temperature: attrs(R.propOr({}, 'temperature', period)),
    symbol: attrs(R.propOr({}, 'symbol', period)),
    windDirection: attrs(R.propOr({}, 'windDirection', period)),
    windSpeed: attrs(R.propOr({}, 'windSpeed', period)),
  })),
}))

export const run = () =>
  fetch('/api/weather')
    .then((response: Response) => response.text())
    .then((str: string) =>
      new (window as any).DOMParser().parseFromString(str, 'text/xml')
    )
    .then((data: any) => xmlToJson(data))
    .then((data: any) => pickWeather(data) as WeatherData)
    .catch(err => {
      console.error('Failed to get weather', err)
      throw err
    })
