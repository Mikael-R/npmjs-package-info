// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import request from 'request'
import cheerio from 'cheerio'
import { JSDOM } from 'jsdom'

import { scrapingPathsJS, convertToNumber, htmlToJson } from '@utils/.'

class PackageController {
  static index (req: Request, res: Response) {
    const npmPackage = {
      name: req.params.packageName,
      url: `https://npmjs.com/package/${req.params.packageName}`,
      versions: 0,
      dependencies: 0,
      dependents: 0,
      lastVersion: '',
      license: null,
      weeklyDownloads: 0,
      unpackedSize: null,
      totalFiles: 0,
      lastPublish: '',
      keywords: []
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

      npmPackage.versions = convertToNumber(document.querySelector(scrapingPathsJS.versions).innerHTML)

      npmPackage.dependencies = convertToNumber(document.querySelector(scrapingPathsJS.dependencies).innerHTML)

      npmPackage.dependents = convertToNumber(document.querySelector(scrapingPathsJS.dependents).innerHTML)

      npmPackage.lastVersion = document.querySelector(scrapingPathsJS.lastVersion).innerHTML

      npmPackage.license = document.querySelector(scrapingPathsJS.license).innerHTML

      npmPackage.weeklyDownloads = convertToNumber(document.querySelector(scrapingPathsJS.weeklyDownloads).innerHTML)

      npmPackage.unpackedSize = document.querySelector(scrapingPathsJS.unpackedSize).innerHTML.split('').length < 10 ? document.querySelector(scrapingPathsJS.unpackedSize).innerHTML : null

      npmPackage.totalFiles = document.querySelector(scrapingPathsJS.unpackedSize).innerHTML.split('').length < 10 ? convertToNumber(document.querySelector(scrapingPathsJS.unpackedSize).innerHTML) : null

      npmPackage.lastPublish = document.querySelector(scrapingPathsJS.lastPublish).innerHTML

      htmlToJson(document.querySelector(scrapingPathsJS.keywords) ? document.querySelector(scrapingPathsJS.keywords).innerHTML : '').map(value => value.children.map(value => value.children.map(value => npmPackage.keywords.push(value.content))))

      return res.json(npmPackage)
    }

    request(npmPackage.url, scraping)
  }
}

export default PackageController
