import React, { useContext } from 'react'
import { join } from 'ramda'
import DateContext from './DateContext'

const pad = (nr: number) => `${nr < 10 ? '0' : ''}${nr}`

const getTime = (date: Date) =>
  join(':', [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ])

const Time = () => {
  const date = useContext(DateContext)
  return <span>{getTime(date)}</span>
}

export default Time
