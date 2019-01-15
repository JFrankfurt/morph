const { Router } = require('express')
const storage = require('../storage/index')
const isAuthenticated = require('./isAuthenticated')

module.exports = Router()
  .post('/message', isAuthenticated, (req, res) => {
    const { msg, tags } = req.body
    const id = storage.addMessage(msg)
    for (let tag of tags.split(' ')) {
      storage.addTag(id, tag)
    }
    res.status(200).send(id)
  })
  .get('/message/:id', isAuthenticated, (req, res) => {
    const { id } = req.params
    const message = storage.getMessageById(id)
    if (message) {
      res.status(200).send(message)
    } else {
      res.status(404).send()
    }
  })
  .get('/messages/:tag', isAuthenticated, (req, res) => {
    const { tag } = req.params
    const messages = storage.getMessagesByTag(tag)
    res.status(200).json({ messages })
  })
