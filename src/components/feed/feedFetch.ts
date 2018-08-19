import axios from 'axios'
import { parseRss } from '../../util/StringUtils';
import { URL_CORS_PROXY, URL_IDG } from '../../constants';

export interface IFeedItem {
    title: string,
    link: string,
    pubDate: string,
    content: string,
    isoDate: string,
    contentSnippet: string,
    categories: string[]
}

export const getIdgFeed = (async () => {
    try {
        let items: IFeedItem[]
        if (process.env.NODE_ENV === 'development') {
            items = require('./fixture').items
        } else {

            const response = await axios.get(URL_CORS_PROXY + URL_IDG)
            const feed = await parseRss<{ items: IFeedItem[] }>(response.data)
            items = feed ? feed.items : []
        }
        items.sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate))
        return items
    } catch (err) {
        return []
    }
})
