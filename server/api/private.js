const { Router } = require('express')
const uuidv4 = require('uuid/v4')
const storage = require('../storage/index')
const isAuthenticated = require('./isAuthenticated')

module.exports = Router()
  .post('/message', isAuthenticated, (req, res) => {
    const { msg, tags } = req.body
    const id = uuidv4()
    storage.messages.id[id] = msg
    for (let tag of tags) {
      storage.messages.tags[tag] = storage.messages.tags[tag]
        ? storage.messages.tags[tag].concat(id) // if it exists, concat the message
        : [id] // else, assign a message to the array
    }
    res.status(200).send(id)
  })
  .get('/message/:id', isAuthenticated, (req, res) => {
    const { id } = req.params
    const message = storage.messages.id[id]
    if (message) {
      res.status(200).send(message)
    } else {
      res.status(400).send()
    }
  })
  .get('/messages/:tag', isAuthenticated, (req, res) => {
    const { tag } = req.params
    const messageIds = storage.messages.tags[tag]
    if (messageIds) {
      let messages = []
      for (let id of messageIds) {
        const message = storage.messages.id[id]
        if (message) {
          messages = messages.concat(message)
        }
      }
      res.status(200).json({ messages })
    } else {
      res.status(400).send()
    }
  })
