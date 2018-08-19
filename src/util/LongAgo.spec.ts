import { howLongAgo } from "./LongAgo";

describe('LongAgo', () => {
    it('prints seconds as just now', () => {
        const t = new Date()
        expect(howLongAgo(t)).toEqual('just now')
    })

})