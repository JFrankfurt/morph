const { Router } = require('express')
const publicAPI = require('./public')
const privateAPI = require('./private')

module.exports = Router()
  .use(publicAPI)
  .use(privateAPI)
