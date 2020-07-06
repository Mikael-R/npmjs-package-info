const express = require('express')

const PackageController = require('./controllers/PackageController')

const routes = express.Router()

routes.get('/:packageName', new PackageController().index)

module.exports = routes
