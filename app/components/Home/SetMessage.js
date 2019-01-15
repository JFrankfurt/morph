import React, { useState } from 'react'
import { Button, SubTitle } from '../common'
import { Input, InputArea } from '../../screens/Home'
import { postMessage } from '../../api'

export default ({ localPair }) => {
  const [message, setMessage] = useState('')
  const [tags, setTags] = useState('')
  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'message':
        setMessage(value)
        return
      case 'tags':
        setTags(value)
        return
      default:
        console.warn('failed message set')
    }
  }
  function sendMessage() {
    const { key, shared_secret } = localPair
    postMessage(key, shared_secret, message, tags).then(console.log)
  }
  return (
    <InputArea>
      <SubTitle>Set your message</SubTitle>
      <Input
        type="text"
        style={{ marginBottom: 10 }}
        value={message}
        name="message"
        onChange={handleChange}
        placeholder="message"
      />
      <Input
        type="text"
        style={{ marginBottom: 10 }}
        value={tags}
        name="tags"
        onChange={handleChange}
        placeholder="space separated tags"
      />
      <Button onClick={sendMessage}>send message</Button>
    </InputArea>
  )
}
