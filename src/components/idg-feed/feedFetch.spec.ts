import { get } from "./feedFetch";

describe('feedFetch', async () => {
    it('fetches', async () => {
        const feed = await get();
        console.log(feed)
    })
})