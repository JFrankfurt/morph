const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')
const uuidv4 = require('uuid/v4')

class Data {
  constructor() {
    this.filePath = resolve('server/storage/data.json')
    this.data = JSON.parse(readFileSync(this.filePath))
  }
  _write() {
    writeFileSync(this.filePath, JSON.stringify(this.data, null, 2))
  }
  addMessage(message) {
    const id = uuidv4()
    this.data.messages.ids[id] = message
    this._write()
    return id
  }
  addTag(id, tag) {
    this.data.messages.tags[tag] = this.data.messages.tags[tag]
      ? this.data.messages.tags[tag].concat(id) // if it exists, concat the message
      : [id] // else, assign a message to the array
    this._write()
  }
  getMessageById(id) {
    return this.data.messages.ids[id]
  }
  getKeyPair(key) {
    return this.data.keys[key] // { key: string, shared_secret: string }
  }
  getMessagesByTag(tag) {
    const messageIds = this.data.messages.tags[tag]
    let messages = []
    for (let id of messageIds) {
      const message = this.getMessageById(id)
      if (message) {
        messages = messages.concat(message)
      }
    }
    return messages
  }
  newKeyPair(key, shared_secret) {
    this.data.keys[key] = { key, shared_secret }
    this._write()
  }
}

module.exports = new Data()
