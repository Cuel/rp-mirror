import * as React from 'react'
import { IFeedItem, getIdgFeed } from './feedFetch';
import { ILocale } from '../../util/Translate';
import { FeedList } from './Feedlist';

import './Feed.css'

interface IProps {
    locale: ILocale
}

interface IState {
    items: IFeedItem[]
}

const FETCH_INTERVAL = 60 * 1000
const ITEMS_LIMIT = 10

export class FeedComponent extends React.Component<IProps, IState> {
    private intervalId: NodeJS.Timer

    constructor(props: IProps) {
        super(props)
        this.state = { items: [] }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.getItems, FETCH_INTERVAL)
        this.getItems()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        return (
            <div className="App-feed">
                <FeedList limit={ITEMS_LIMIT} items={this.state.items} />
            </div>
        )
    }

    private async getItems() {
        const items = await getIdgFeed();
        this.setState({ items })
    }
}
