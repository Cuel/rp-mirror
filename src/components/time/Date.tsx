import React, { useContext } from 'react'
import DateContext from './DateContext'

const capitalize = (str = '') => str.charAt(0).toUpperCase() + str.slice(1)

const Date = () => {
  const date = useContext(DateContext)

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const str = capitalize(date.toLocaleDateString('sv-SE', options))
  return <span>{str}</span>
}

export default Date
