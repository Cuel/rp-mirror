import { translateProvider, ITranslations } from './Translate';

const mock: ITranslations = {
    default: {
        "test": "correct eng",
        "interpolate": "hello {test} {test}"
    },
    "sv-SE": {
        "test": "correct swe",
        "interpolate": "hello {arg1}, {arg2}"
    }
}

describe('translateProvider', () => {
    it('returns a function bound with translations', () => {
        const t = translateProvider(mock, 'default')
        expect(t).toEqual(expect.any(Function))
        expect(t('test')).toEqual('correct eng')
        expect(t('interpolate', { test: 'replace' })).toEqual('hello replace replace')
    })

    it('returns a function bound with translations', () => {
        const t = translateProvider(mock, 'sv-SE')
        expect(t).toEqual(expect.any(Function))
        expect(t('test')).toEqual('correct swe')
    })
})