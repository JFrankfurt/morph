const { Router } = require('express')
const storage = require('../storage/index')

module.exports = Router().put('/credential', (req, res) => {
  const { key, shared_secret } = req.body
  console.log(req.body, JSON.stringify(storage))
  if (storage.getKeyPair(key)) {
    res.status(403).send()
  } else {
    storage.newKeyPair(key, shared_secret)
    res.status(204).send()
  }
})
