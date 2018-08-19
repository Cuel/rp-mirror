import axios from 'axios'
import { getIdgFeed } from './feedFetch';
import { URL_CORS_PROXY, URL_IDG } from '../../constants';

jest.mock('axios')

const mockRss = jest.fn()
jest.mock('rss-parser', () => {
    return jest.fn().mockImplementation(() => {
        return {
            parseString: mockRss
        }
    })
})

describe('feedFetch', async () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.restoreAllMocks())

    it('returns empty array when no data', async () => {
        const response = { data: 'test1' }
        const get = jest.spyOn(axios, 'get')
        get.mockImplementationOnce(() => Promise.resolve(response))

        const feed = await getIdgFeed()
        expect(axios.get).toHaveBeenCalledWith(URL_CORS_PROXY + URL_IDG)
        expect(mockRss).toHaveBeenCalledWith(response.data)
        expect(feed).toEqual([])
    })

    it('return empty array on network error', async () => {
        const get = jest.spyOn(axios, 'get')
        get.mockImplementationOnce(() => Promise.reject(new Error()))

        const feed = await getIdgFeed()
        expect(get).toHaveBeenCalled()
        expect(mockRss).not.toHaveBeenCalled()
        expect(feed).toEqual([])
    })

    it('return empty array on rss error', async () => {
        const response = { data: 'test2' }
        const get = jest.spyOn(axios, 'get')
        get.mockImplementationOnce(() => Promise.resolve(response))
        mockRss.mockImplementationOnce(() => Promise.reject(new Error()))

        const feed = await getIdgFeed()
        expect(mockRss).toHaveBeenCalledWith(response.data)
        expect(feed).toEqual([])
    })

    it('returns 2 items', async () => {
        const get = jest.spyOn(axios, 'get')
        get.mockImplementationOnce(() => Promise.resolve({ data: 'test3' }))

        const expected = [1, 2]
        mockRss.mockImplementationOnce(() => Promise.resolve({ items: expected }))

        const feed = await getIdgFeed()
        expect(get).toHaveBeenCalled()
        expect(mockRss).toHaveBeenCalled()
        expect(feed).toEqual(expected)
    })
})

