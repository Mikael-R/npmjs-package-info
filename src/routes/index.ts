import Router, { Application } from 'express'

import packageRouter from './package'

const useRoutes = (app: Application) => {
  const apiRouter = Router()

  apiRouter.use('/package', packageRouter)

  app.use('/api/v1', apiRouter)
}

export default useRoutes
