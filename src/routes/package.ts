import { Router } from 'express'

import PackageController from '@controllers/PackageController'

const packageRouter = Router()

packageRouter.get('/:packageName', PackageController.index)

export default packageRouter
