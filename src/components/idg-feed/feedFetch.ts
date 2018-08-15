import axios from 'axios'
const RSSParser = require('rss-parser');

const URL = 'https://www.idg.se/rss/nyheter'
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

let parser = new RSSParser();

interface FeedItem {
    title: string,
    link: string,
    pubDate: string,
    content: string,
    isoDate: string,
    contentSnippet: string,
    categories: string[]
}

interface Feed {
    items: FeedItem []
}

export const get = (() => {
    return new Promise(async (resolve, reject) => {
        const feed = await axios.get(CORS_PROXY + URL)
        parser.parseString(feed.data, (err: Error, newFeed: Feed) => {
            console.log(newFeed)
            return resolve(newFeed)
        })
    })

})
