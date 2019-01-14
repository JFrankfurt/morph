import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import Background from './Background'

const LayoutRoot = styled.div`
  align-items: center;
  background-color: ${theme.canvas.light};
  display: flex;
  justify-content: center;
  min-height: 100vh;
`
const Content = styled.div`
  z-index: 2;
`

export default ({ children }) => (
  <LayoutRoot>
    <Content>{children}</Content>
    <Background />
  </LayoutRoot>
)
