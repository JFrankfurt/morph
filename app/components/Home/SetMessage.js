import React, { useState } from 'react'
import { Button, SubTitle } from '../common'
import { Input, InputArea } from '../../screens/Home'

export default () => {
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

  const sendMessage = () => {

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
