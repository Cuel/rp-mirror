import { translateProvider } from './Translate';


describe('translateProvider', () => {
    it('returns a function bound with translations', () => {
        const translations = {test: 'correct'}
        const t = translateProvider(translations)
        expect(t).toEqual(expect.any(Function))
        expect(t('test')).toEqual('correct')
    })


})