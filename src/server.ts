import express from 'express'
import cors from 'cors'

import useRoutes from '@routes/index'

const app = express()

const port = process.env.PORT || '3333'

app.use(cors())
app.use(express.json())

useRoutes(app)

app.listen(port, () => console.log('\n> Server working on localhost:' + port))
