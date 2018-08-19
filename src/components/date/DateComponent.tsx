import * as React from 'react';
import { DateView } from './Date';
import translations from './translations';
import { ILocale, translateFactory } from '../../util/Translate';
import { pad } from '../../util/StringUtils';

interface IComponentContext {
    locale: ILocale
}

export interface IDateData {
    seconds: string,
    minutes: string,
    hours: string,
    day: string,
    month: string,
    date: string,
}


export class DateComponent extends React.Component<IComponentContext, { date: Date }>  {
    private intervalId: NodeJS.Timer;

    constructor(props: IComponentContext) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    componentWillMount() {
        this.intervalId = setInterval((() => this.updateDate()), 100)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        const t = translateFactory(translations, this.props.locale)
        return <DateView t={t} dateData={this.getDateData()} />
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
            date: pad(d.getDate()),
            day: d.toLocaleDateString(locale, { weekday: 'long' }),
            month: d.toLocaleDateString(locale, { month: 'long' }),
        }
    }

}