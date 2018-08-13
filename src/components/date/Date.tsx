import * as React from 'react';
import { capitalize } from '../util/StringUtils';
import './Date.css'
import { IDateData } from './index';

export const DateView = (props: { date: IDateData }) => {
    const { hours, minutes, seconds, date, day } = props.date

    return (
        <div>
            <p className="App-date__date">{date}</p>
            <p className="App-date__time">{capitalize(day)}, {hours}:{minutes}:{seconds}</p>
        </div>
    )

}
