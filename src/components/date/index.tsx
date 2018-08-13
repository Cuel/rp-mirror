import * as React from 'react';
import DateView from './DateView';

class DateComponent extends React.Component<object, { date: Date }> {
    private intervalId: number;

    constructor(props: object) {
        super(props)

        this.state = {
            date: new Date()
        }
    }

    public componentWillMount() {
        this.intervalId = setInterval(this.updateDate())
    }

    public componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    public render() {
        return <DateView date={this.state.date} />
    }


    private updateDate() {
        this.setState({ date: new Date() })
    }

}

export default DateComponent