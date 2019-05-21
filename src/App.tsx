import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Weather from './components/weather'
import Date from './components/time/Date'
import Time from './components/time/Time'
import DateContext from './components/time/DateContext'

const App: React.FC = () => {
  const [date, setDate] = useState(new global.Date())

  useEffect(() => {
    const interval = setInterval(() => setDate(new global.Date()), 1000)
    return () => clearInterval(interval)
  }, [date])

  return (
    <div className="App">
      <DateContext.Provider value={date}>
        <div className="App-date">
          <Date />
        </div>
        <div className="App-time">
          <Time />
        </div>
      </DateContext.Provider>
      <Weather />
    </div>
  )
}

export default App
