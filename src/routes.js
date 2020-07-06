const express = require('express')

const PackageController = require('./controllers/PackageController')

const packageController = new PackageController()
const routes = express.Router()

routes.get('/:packageName', packageController.index)

module.exports = routes
