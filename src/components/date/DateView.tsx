import * as React from 'react'

const DateView = (props: {date: Date}) => {
    const {date} = props
    console.log(props)

    return (
        <h1>{date.toDateString()}</h1>
    )
}

export default DateView