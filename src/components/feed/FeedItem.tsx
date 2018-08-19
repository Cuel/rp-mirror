import * as React from 'react';
import { IFeedItem } from './feedFetch';

export const FeedItem = (props: { item: IFeedItem }) => {
    const { item } = props
    return (
        <li className="App-feed__item">
            <p className="App-feed__item-text">{item.title}</p>
            <p className="App-feed__item-text">{item.pubDate}</p>
        </li>
    )
}
