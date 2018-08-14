import { translateFactory, ITranslations } from './Translate';

const mock: ITranslations = {
    default: {
        test: "correct eng",
        interpolate: "hello {test} {test}"
    },
    "sv-SE": {
        test: "correct swe",
        interpolate: "hello, {arg1} {arg2}"
    }
}

describe('translateProvider', () => {
    it('doesnt change when interpolate is wrong', () => {
        const t = translateFactory(mock, 'default')
        expect(t('interpolate', { noExist: 'replace' })).toEqual(mock.default.interpolate)
    })

    it('returns a function bound with translations', () => {
        const t = translateFactory(mock, 'default')
        expect(t('test')).toEqual('correct eng')
        expect(t('interpolate', { test: 'replace' })).toEqual('hello replace replace')
    })

    it('returns a function bound with translations', () => {
        const t = translateFactory(mock, 'sv-SE')
        expect(t('test')).toEqual('correct swe')
        expect(t('interpolate', {arg1: 'my', arg2: 'dude'})).toEqual('hello, my dude')
    })
})