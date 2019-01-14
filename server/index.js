// note: any changes here must for the time being be repeated in ../dev-server.js

require('dotenv').config({})
const express = require('express')
const APIRouter = require('./api')
const port = process.env.PORT || 8000

const app = express()

app.set('port', port)
app.use(express.json())
app.use(APIRouter)

app.listen(app.get('port'), () =>
  console.log('listening on port', app.get('port'))
)
