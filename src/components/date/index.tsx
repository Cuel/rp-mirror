import * as React from 'react';
import { DateView } from './Date';
import { pad } from '../util/StringUtils';
import { ITranslate, ITranslations } from '../util/Translate';

interface IComponentContext {
    t: ITranslate
    locale: keyof ITranslations
}

export interface IDateData {
    seconds: string,
    minutes: string,
    hours: string,
    day: string,
    month: string,
    date: string,
}

class DateComponent extends React.Component<IComponentContext, { date: Date }>  {
    private intervalId: NodeJS.Timer;

    constructor(props: IComponentContext) {
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
        const { locale } = this.props
        const d = this.state.date
        return {
            seconds: pad(d.getSeconds()),
            minutes: pad(d.getMinutes()),
            hours: pad(d.getHours()),
            day: d.toLocaleDateString(locale, { weekday: 'long' }),
            month: d.toLocaleDateString(locale, { month: 'long' }),
            date: d.toLocaleDateString(locale)
        }
    }

}

export default DateComponent