import * as React from 'react';
import {DateView} from './Date';
import { pad } from '../util/StringUtils';

export interface IDateData {
    seconds: string,
    minutes: string,
    hours: string,
    day: string,
    month: string,
    date: string,
}

class DateComponent extends React.Component<object, { date: Date }> {
    private intervalId: NodeJS.Timer;

    constructor(props: object) {
        super(props)

        this.state = {
            date: new Date()
        }
    }

    public componentWillMount() {
        this.intervalId = setInterval((() => this.updateDate()), 100)
    }

    public componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    public render() {
        return <DateView date={this.getDateData()} />
    }


    private updateDate() {
        this.setState({ date: new Date() })
    }

    private getDateData() {
        const d = this.state.date
        return {
            seconds: pad(d.getSeconds()),
            minutes: pad(d.getMinutes()),
            hours: pad(d.getHours()),
            day: d.toLocaleDateString('sv-SE', { weekday: 'long' }),
            month: d.toLocaleDateString('sv-SE', { month: 'long' }),
            date: d.toLocaleDateString('sv-SE')
        }
    }

}

export default DateComponent