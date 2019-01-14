const { createHmac, timingSafeEqual } = require('crypto')
const storage = require('../storage/index')

module.exports = function isAuthenticated(req, res, next) {
  const xkey = req.header('X-Key') // key
  const xroute = req.header('X-Route') // route of request
  const xsignature = req.header('X-Signature') // HMAC-SHA256 sig
  const auth = storage.key[xkey]
  if (!auth) {
    res.status(403).send()
  }
  const { shared_secret } = auth
  const values = [
    ...Object.entries(req.body),
    ...Object.entries(req.params),
    ['X-Route', xroute],
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

  const hmac = createHmac('sha256', shared_secret)
  hmac.update(preImage, 'utf8')
  const recovered = hmac.digest()
  const sigBuffer = Buffer.from(xsignature, 'utf8');

  // does the signature provided match the one we derived?
  const authenticated = timingSafeEqual(recovered, sigBuffer)
  if (authenticated) {
    return next()
  }
  res.status(403).send()
}
