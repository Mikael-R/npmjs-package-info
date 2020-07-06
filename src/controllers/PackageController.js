const request = require('request')
const cheerio = require('cheerio')
const { JSDOM } = require('jsdom')

const { scrapingPaths, convertToNumber } = require('../utils')

class itemsController {
  index (req, res) {
    const npmPackage = {
      name: req.params.packageName,
      url: `https://npmjs.com/package/${req.params.packageName}`
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

      npmPackage.totalFiles = convertToNumber(document.querySelector(scrapingPaths.totalFiles).innerHTML)

      npmPackage.lastPublish = document.querySelector(scrapingPaths.lastPublish).innerHTML

      return res.send(npmPackage)
    }

    request(npmPackage.url, scraping)
  }
}

module.exports = itemsController
