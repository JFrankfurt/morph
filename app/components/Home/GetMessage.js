import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, SubTitle } from '../common'
import { Input, InputArea } from '../../screens/Home'
import { getMessageById, getMessageByTag } from '../../api'

const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

export default ({ localPair, displayMessages }) => {
  const [id, setId] = useState('')
  const handleChange = ({ target: { value } }) => setId(value)
  function getMessage(name) {
    if (id) {
      const { key, shared_secret } = localPair
      if (name === 'id') {
        return getMessageById(key, shared_secret, id)
          .then(x => x.text())
          .then(message => displayMessages([message]))
      } else if (name === 'tag') {
        return getMessageByTag(key, shared_secret, id)
          .then(x => x.json())
          .then(x => displayMessages(x.messages))
      }
    }
  }
  return (
    <InputArea>
      <SubTitle>Get a message</SubTitle>
      <Input
        type="text"
        style={{ marginBottom: 10 }}
        value={id}
        onChange={handleChange}
        placeholder="id or tag"
      />
      <Controls>
        <Button disabled={!id} onClick={() => getMessage('id')}>
          by id
        </Button>
        <Button disabled={!id} onClick={() => getMessage('tag')}>
          by tag
        </Button>
      </Controls>
    </InputArea>
  )
}
