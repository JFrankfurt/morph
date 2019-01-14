import HMACsha256 from 'crypto-js/hmac-sha256'
import Hex from 'crypto-js/enc-hex'

const headers = (user_key, route, shared_secret, ...params) => {
  const message = '' // todo
  return {
    'X-Key': user_key,
    'X-Route': route,
    'X-Signature': HMACsha256(message, shared_secret).toString(Hex),
  }
}

export const putCredentials = (key, shared_secret) =>
  fetch('/credential', {
    method: 'PUT',
    headers: headers(key, '/credentials', signature),
    body: JSON.stringify({
      key,
      shared_secret,
    }),
  })

export const postMessage = (key, signature, msg, tags) =>
  fetch('/message', {
    method: 'POST',
    headers: headers(key, '/message', signature),
    body: JSON.stringify({ msg, tags }),
  })

export const getMessageById = (key, signature, id) =>
  fetch(`/message/${id}`, {
    method: 'GET',
    headers: headers(key, `/message/${id}`, signature),
  })

export const getMessageByTag = (key, signature, tag) =>
  fetch(`/message/${tag}`, {
    method: 'GET',
    headers: headers(key, `/message/${tag}`, signature),
  })
