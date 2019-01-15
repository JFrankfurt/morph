import HMACsha256 from 'crypto-js/hmac-sha256'
import Hex from 'crypto-js/enc-hex'

const headers = (user_key, route, shared_secret, body = {}, params = {}) => {
  const values = [
    ...Object.entries(body),
    ...Object.entries(params),
    ['X-Route', route],
  ]
  const sortedValues = values.sort((a, b) => {
    const keyA = a[0]
    const keyB = b[0]
    if (keyA < keyB) {
      return -1
    } else if (keyA > keyB) {
      return 1
    } else {
      return 0
    }
  })
  const preImage = sortedValues.reduce(
    (acc, cur) => `${acc}${acc ? ';' : ''}${cur[0]}=${cur[1]}`,
    ''
  )
  return {
    'X-Key': user_key,
    'X-Route': route,
    'X-Signature': HMACsha256(preImage, shared_secret).toString(Hex),
  }
}

export const putCredentials = (key, shared_secret) => {
  const body = { key, shared_secret }
  const params = {}
  return fetch('/credential', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers(key, '/credentials', shared_secret, body, params),
    },
    body: JSON.stringify(body),
  })
}

export const postMessage = (key, shared_secret, msg, tags) => {
  const body = { msg, tags }
  const params = {}
  return fetch('/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers(key, '/message', shared_secret, body, params),
    },
    body: JSON.stringify(body),
  })
}

export const getMessageById = (key, shared_secret, id) => {
  const body = {}
  const params = { id }
  return fetch(`/message/${id}`, {
    method: 'GET',
    headers: headers(key, `/message/${id}`, shared_secret, body, params),
  })
}

export const getMessageByTag = (key, shared_secret, tag) => {
  const body = {}
  const params = { tag }
  return fetch(`/messages/${tag}`, {
    method: 'GET',
    headers: headers(key, `/message/${tag}`, shared_secret, body, params),
  })
}
