import React, { useEffect, useState } from 'react'
import { run, WeatherData } from './fetcher'

const FETCH_INTERVAL = 5 * 60 * 1000

export default () => {
  const [data, setData] = useState<WeatherData | null>(null)

  useEffect(() => {
    run().then(weatherData => setData(weatherData))
  }, [])

  useEffect(() => {
    const interval = setInterval(
      () => run().then(weatherData => setData(weatherData)),
      FETCH_INTERVAL
    )

    return () => clearInterval(interval)
  }, [data])

  return <h1>Hey</h1>
}
