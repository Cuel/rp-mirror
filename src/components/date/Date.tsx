import * as React from 'react';
import { capitalize } from '../util/StringUtils';
import './Date.css'
import { IDateData } from '.';
import { ITranslate } from '../util/Translate';

export const DateView = (props: { t: ITranslate, date: IDateData }) => {
    const t = props.t
    const { hours, minutes, seconds, month, date, day } = props.date
    const dateString = capitalize(t('full.date', { day, month, date }));

    return (
        <div className="App-date">
            <p className="App-date__date">{dateString}</p>
            <p className="App-date__time">{hours}:{minutes}:{seconds}</p>
        </div>
    )

}
