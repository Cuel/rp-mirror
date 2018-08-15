import axios from 'axios'

export const get = (async () => {
    const feed = await axios.get('https://www.idg.se/rss/nyheter')
    return feed
})