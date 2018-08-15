
export function capitalize(str: string): string {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

export function pad(nr: number): string {
    if (nr > -1 && nr < 10) return `0${nr}`
    return `${nr}`
}