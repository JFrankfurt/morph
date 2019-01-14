const { Router } = require('express')
const storage = require('../storage/index')

module.exports = Router().put('/message', (req, res) => {
  const { key, shared_secret } = req.body
  if (storage.key[key]) {
    res.status(403).send()
  } else {
    storage.key[key] = { key, shared_secret }
    res.status(204).send()
  }
})
