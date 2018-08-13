import { pad, capitalize } from './StringUtils';

it('pads', () => {
    expect(pad(-1)).toBe('-1')
    expect(pad(0)).toBe('00')
    expect(pad(9)).toBe('09')
    expect(pad(10)).toBe('10')
    expect(pad(100)).toBe('100')
})

it('capitalizes', () => {
    expect(capitalize('')).toBe('')
    expect(capitalize('test')).toBe('Test')
    expect(capitalize('tEST')).toBe('TEST')
    expect(capitalize('test test')).toBe('Test test')
})