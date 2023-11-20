export const strToHex = (str) =>
    str
        .split('')
        .map((e) => e.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
