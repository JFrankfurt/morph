import React, { useState } from 'react'
import { Button, SubTitle } from '../common'
import { Input, InputArea } from '../../screens/Home'
import { theme } from '../../styles/theme'

export default ({ submitPair, usePair }) => {
  const [key, setKey] = useState('')
  const [shared_secret, setShared_secret] = useState('')
  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'key':
        setKey(value)
        return
      case 'shared_secret':
        setShared_secret(value)
        return
    }
  }
  return (
    <InputArea>
      <SubTitle>Set your encryption key</SubTitle>
      <Input
        type="text"
        style={{ marginBottom: 10 }}
        value={key}
        name="key"
        onChange={handleChange}
        placeholder="key"
      />
      <Input
        type="text"
        style={{ marginBottom: 10 }}
        value={shared_secret}
        name="shared_secret"
        onChange={handleChange}
        placeholder="shared secret"
      />
      <Button
        disabled={!shared_secret || !key}
        onClick={() => {
          if (shared_secret && key) {
            submitPair(key, shared_secret)
          }
        }}
        color={theme.color.pink}>
        submit new pair
      </Button>
      <Button
        onClick={() => {
          if (shared_secret && key) {
            usePair(key, shared_secret)
          }
        }}>
        use pair
      </Button>
    </InputArea>
  )
}
