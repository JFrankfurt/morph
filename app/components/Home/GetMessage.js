import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, SubTitle } from '../common'
import { Input, InputArea } from '../../screens/Home'

const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

export default () => {
  const [id, setId] = useState('')
  const handleChange = ({ target: { value } }) => setId(value)
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
        <Button>by id</Button>
        <Button>by tag</Button>
      </Controls>
    </InputArea>
  )
}
