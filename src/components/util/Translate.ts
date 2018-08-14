interface IKeyValue { [key: string]: string }

export interface ITranslations {
    default: IKeyValue
    "sv-SE": IKeyValue
}

export const translateProvider = <T>(translations: T, language: keyof ITranslations = 'default') => {

    const lang = translations[language]

    return <K1 extends keyof T, K2 extends string & keyof T[K1]>(key: K2, interpolate?: IKeyValue): string => {
        return translate(lang[key] || '', interpolate)
    }
}

const translate = (value: string, interpolate?: IKeyValue): string => {
    if (!interpolate) return value

    Object.keys(interpolate).forEach(key => {
        value = value.replace(new RegExp(`key`, 'g'), interpolate[key])
    })
    return value
}