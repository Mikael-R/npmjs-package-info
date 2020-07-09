import { parse } from 'himalaya'

const scrapingPathsJS = {
  versions: '#top > ul > li._8055e658.f5.fw5.tc.pointer.b4fcfd19 > a > span > span',
  dependencies: '#top > ul > li._8055e658.f5.fw5.tc.pointer.c1f85151 > a > span > span',
  dependents: '#top > ul > li._8055e658.f5.fw5.tc.pointer._7cec0316 > a > span > span',
  lastVersion: '#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(4) > p',
  license: '#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(5) > p',
  weeklyDownloads: '#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(3) > div > div > p',
  unpackedSize: '#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(6) > p',
  totalFiles: '#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(7) > p',
  lastPublish: '#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div._702d723c.dib.w-50.bb.b--black-10.pr2.w-100 > p > time',
  keywords: '#top > div._6620a4fd.mw8-l.mw-100.w-100.w-two-thirds-l.ph3-m.pt2.pl0-ns.pl2.order-1-m.order-0-ns.order-1.order-2-m > section > div.pv4 > ul'
}

const convertToNumber = (str: string) => (
  Number(str.split('').filter((character: any) => !isNaN(character)).join(''))
)

const htmlToJson = (html: string) => {
  return parse(html)
}

export {
  scrapingPathsJS,
  convertToNumber,
  htmlToJson
}
