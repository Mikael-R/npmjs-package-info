import request from 'request'
import cheerio from 'cheerio'
import { JSDOM } from 'jsdom'

import { scrapingPaths, convertToNumber } from '@utils/.'


class PackageController {
  static index (req, res) {
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
      lastPublish: ''
    }

    const scraping = (err, resp, body) => {
      if (err) return res.send({ error: err })

      if (resp.statusCode !== 200) {
        return res.send({ error: 'Package not found' })
      }

      const webSiteHTML = cheerio.load(body).html()

      const {
        window: { document }
      } = new JSDOM(webSiteHTML)

      npmPackage.versions = convertToNumber(document.querySelector(scrapingPaths.versions).innerHTML)

      npmPackage.dependencies = convertToNumber(document.querySelector(scrapingPaths.dependencies).innerHTML)

      npmPackage.dependents = convertToNumber(document.querySelector(scrapingPaths.dependents).innerHTML)

      npmPackage.lastVersion = document.querySelector(scrapingPaths.lastVersion).innerHTML

      npmPackage.license = document.querySelector(scrapingPaths.license).innerHTML

      npmPackage.weeklyDownloads = convertToNumber(document.querySelector(scrapingPaths.weeklyDownloads).innerHTML)

      npmPackage.unpackedSize = document.querySelector(scrapingPaths.unpackedSize).innerHTML.split('').length < 10 ? document.querySelector(scrapingPaths.unpackedSize).innerHTML : null

      npmPackage.totalFiles = document.querySelector(scrapingPaths.unpackedSize).innerHTML.split('').length < 10 ? convertToNumber(document.querySelector(scrapingPaths.unpackedSize).innerHTML) : null

      npmPackage.lastPublish = document.querySelector(scrapingPaths.lastPublish).innerHTML

      return res.send(npmPackage)
    }

    request(npmPackage.url, scraping)
  }
}

export default PackageController
