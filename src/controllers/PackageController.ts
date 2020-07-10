// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import request from 'request'
import cheerio from 'cheerio'
import { JSDOM } from 'jsdom'

// eslint-disable-next-line no-unused-vars
import { npmPackage } from '@controllers/types'

import { convertToNumber, htmlToJson, toTitleCase } from '@utils/.'

class PackageController {
  static index (req: Request, res: Response) {
    const npmPackage: npmPackage = {
      name: req.params.packageName,
      url: `https://npmjs.com/package/${req.params.packageName}`,
      versions: 0,
      dependencies: 0,
      dependents: 0,
      lastVersion: '',
      license: '',
      weeklyDownloads: 0,
      unpackedSize: '',
      totalFiles: 0,
      lastPublish: '',
      keywords: []
    }

    const totalFiles = (document): string | undefined | null => {
      if (document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(3) > a') !== null) {
        return document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(8) > p')?.innerHTML
      } else if (document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(7) > p')?.innerHTML.match(/[A-z]+/g)) {
        return null
      } else {
        return document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(7) > p')?.innerHTML
      }
    }

    const weeklyDownloads = (document): string | undefined | null => {
      if (document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(3) > a') !== null) {
        return document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(4) > div > div > p')?.innerHTML
      } else {
        return document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(3) > div > div > p')?.innerHTML
      }
    }

    const unpackageSize = (document): string | undefined | null => {
      if (document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(3) > a') !== null) {
        return document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(7) > p')?.innerHTML
      } else if (document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(6) > p')?.innerHTML.length < 10) {
        return document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(6) > p').innerHTML
      } else {
        return null
      }
    }

    const scraping = (err, resp, body) => {
      if (err) return res.json({ error: err })

      if (resp.statusCode !== 200) {
        return res.json({ error: 'Package not found' })
      }

      const webSiteHTML = cheerio.load(body).html()

      const {
        window: { document }
      } = new JSDOM(webSiteHTML)

      npmPackage.versions = convertToNumber(document.querySelector('#top > ul > li._8055e658.f5.fw5.tc.pointer.b4fcfd19 > a > span > span')?.innerHTML)

      npmPackage.dependencies = convertToNumber(document.querySelector('#top > ul > li._8055e658.f5.fw5.tc.pointer.c1f85151 > a > span > span')?.innerHTML)

      npmPackage.dependents = convertToNumber(document.querySelector('#top > ul > li._8055e658.f5.fw5.tc.pointer._7cec0316 > a > span > span')?.innerHTML)

      npmPackage.lastVersion = document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(4) > p')?.innerHTML

      npmPackage.license = document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(5) > p')?.innerHTML

      npmPackage.totalFiles = convertToNumber(totalFiles(document))

      npmPackage.weeklyDownloads = convertToNumber(weeklyDownloads(document))

      npmPackage.unpackedSize = unpackageSize(document)

      npmPackage.lastPublish = document.querySelector('#top > div.w-100.ph0-l.ph3.ph4-m > span:nth-child(4) > time')?.innerHTML

      htmlToJson(document.querySelector('#top > div._6620a4fd.mw8-l.mw-100.w-100.w-two-thirds-l.ph3-m.pt2.pl0-ns.pl2.order-1-m.order-0-ns.order-1.order-2-m > section > div.pv4 > ul')?.innerHTML || '').map(value => value.children.map(value => value.children.map(value => npmPackage.keywords.push(toTitleCase(value.content)))))

      return res.json(npmPackage)
    }

    request(npmPackage.url, scraping)
  }
}

export default PackageController
