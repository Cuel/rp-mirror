
export const translateProvider = <T>(translations: T, language = 'default') => {

    const lang = translations[language]

    return function (key: keyof T) {
        const value = lang.hasOwnProperty(key) ? lang[key] : ''
        return translate(value)
    }
}

const translate = () => {

}