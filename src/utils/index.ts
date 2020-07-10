import { parse } from 'himalaya'

const convertToNumber = (str: string | undefined | null): number | null => {
  if (str === undefined || str === null) return null

  return Number(str.split('').filter((character: any) => !isNaN(character)).join(''))
}

const htmlToJson = (html: string) => {
  return parse(html)
}

const toTitleCase = (str: string) => {
  str = str.split(' ').map(word => {
    const wordSplited = word.split('').map(char => char.toLowerCase())
    wordSplited[0] = wordSplited[0].toUpperCase()
    return wordSplited.join('')
  }).join(' ')

  return str
}

export {
  convertToNumber,
  htmlToJson,
  toTitleCase
}
