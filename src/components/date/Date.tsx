import * as React from 'react';
import './Date.css'
import { IDateData } from '.';
import { ITranslate } from 'src/util/Translate';
import { capitalize } from '../../util/StringUtils';

export const DateView = (props: { t: ITranslate, dateData: IDateData }) => {
    const { t, dateData: { hours, minutes, seconds, month, date, day } } = props
    const dateString = capitalize(t('full.date', { day, month, date }));

    return (
        <div className="App-date">
            <p className="App-date__date">{dateString}</p>
            <p className="App-date__time">{hours}:{minutes}:{seconds}</p>
        </div>
    )

}
