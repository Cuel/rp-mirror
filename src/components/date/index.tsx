import * as React from 'react';
import './Date.css'

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
        const { hours, minutes, seconds, date, day } = this.getDateData()
        return (<div>
            <p className="date">{date}</p>
            <p className="time">{this.capitalize(day)}, {hours}:{minutes}:{seconds}</p>
            <p>{this.getDateData().month}</p>
        </div>)
    }


    private updateDate() {
        this.setState({ date: new Date() })
    }

    private capitalize(str: string) {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
    }

    private getDateData() {
        const d = this.state.date
        return {
            seconds: this.pad(d.getSeconds()),
            minutes: this.pad(d.getMinutes()),
            hours: this.pad(d.getHours()),
            day: d.toLocaleDateString('sv-SE', { weekday: 'long' }),
            month: d.toLocaleDateString('sv-SE', {month: 'long'}),
            date: d.toLocaleDateString('sv-SE')
        }
    }

    private pad(nr: number): string {
        if (nr < 10) return `0${nr}`
        return `${nr}`
    }

}

export default DateComponent