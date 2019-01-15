import React from 'react'
import styled from 'styled-components'

const MessageArea = styled.div``

export default ({ messages }) => (
  <MessageArea>
    {messages.map(m => (
      <div>{m}</div>
    ))}
  </MessageArea>
)
