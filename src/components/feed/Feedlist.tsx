import * as React from 'react';
import { IFeedItem } from './feedFetch';
import { FeedItem } from './FeedItem';

export const FeedList = (props: { limit: number, items: IFeedItem[] }) => {
    const { limit, items } = props
    const getItems = () => items.slice(limit)
    const itemId = (item: IFeedItem) => item.title + item.pubDate

    return (
        <ul className="App-feed__list">
            {getItems().map(item => <FeedItem key={itemId(item)} item={item} />)}
        </ul>
    )

}
