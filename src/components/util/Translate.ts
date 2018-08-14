interface IKeyValue { [key: string]: string }

export interface ITranslate {
    <T, K1 extends keyof T, K2 extends string & keyof T[K1]>(key: K2, interpolate?: IKeyValue): string
}

export interface ITranslations {
    default: IKeyValue
    "sv-SE": IKeyValue
}

export const translateFactory = <T>(translations: T, language: keyof ITranslations = 'default'): ITranslate => {

    const lang = translations[language]

    return (key, interpolate) => {
        return translate(lang[key] || '', interpolate)
    }
}

const translate = (value: string, interpolate?: IKeyValue): string => {
    if (!interpolate) return value

    Object.keys(interpolate).forEach(key => {
        value = value.replace(new RegExp(`{${key}}`, 'g'), interpolate[key])
    })
    return value
}