import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, SubTitle, Title } from '../../components/common'
import { theme } from '../../styles/theme'
import SetKey from '../../components/Home/SetKey'
import SetMessage from '../../components/Home/GetMessage'
import GetMessage from '../../components/Home/SetMessage'
import { putCredentials } from '../../api'

const HomeRoot = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
export const InputArea = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
`

export const Input = styled.input`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-width: 300px;
  &:focus {
    outline: 1px solid ${theme.color.purple};
  }
`

export default () => {
  const [localPair, setLocalPair] = useState({})
  function submitPair(key, shared_secret) {
    putCredentials(key, shared_secret)
  }
  function usePair(key, shared_secret) {
    setLocalPair({ key, shared_secret })
  }
  return (
    <HomeRoot>
      <Title>encrypted messaging wooo!</Title>
      <SubTitle>active key: {localPair.key || 'none'}</SubTitle>
      <SubTitle>active secret: {localPair.shared_secret || 'none'}</SubTitle>
      {localPair.key && localPair.shared_secret && (
        <Button color={theme.color.purple} onClick={() => setLocalPair({})}>
          clear keys
        </Button>
      )}
      <br />
      {!localPair.key || !localPair.shared_secret ? (
        <SetKey submitPair={submitPair} usePair={usePair} />
      ) : (
        <>
          <SetMessage />
          <GetMessage />
        </>
      )}
    </HomeRoot>
  )
}
