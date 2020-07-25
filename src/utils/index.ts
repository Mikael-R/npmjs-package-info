import { parse } from 'himalaya'

const convertToNumber = (str: string | undefined | null): number | null => {
  if (str === undefined || str === null) return null

  return Number(str.split('').filter((character: any) => !isNaN(character)).join(''))
}

const htmlToJson = (html: string) => {
  return parse(html)
}

export {
  convertToNumber,
  htmlToJson
}
