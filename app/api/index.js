// export const post = (url, data) => fetch(url, {
//   method: 'POST',
//   headers: new Headers({
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('jwt')}`
//   }),
//   body: JSON.stringify(data)
// })

// export const get = url => fetch(url, {
//   method: 'GET',
//   headers: new Headers({'Authorization': `Bearer ${localStorage.getItem('jwt')}`}),
// })

export const sign = () => {
  return ''
}

const headers = (user_key, route, signature) => ({
  'X-Key': user_key,
  'X-Route': route,
  'X-Signature': signature,
})

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
