import express from 'express'
import bodyParser from 'body-parser'
import api from '../api'

const app = () => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // Route
  app.use('/api', api)

  return app
}

export default app
