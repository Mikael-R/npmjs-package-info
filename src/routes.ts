import express from 'express'

import PackageController from '@controllers/PackageController'

const routes = express.Router()

routes.get('/:packageName', PackageController.index)

export default routes
