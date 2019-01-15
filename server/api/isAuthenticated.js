const HMACsha256 = require('crypto-js/hmac-sha256')
const Hex = require('crypto-js/enc-hex')
const { timingSafeEqual } = require('crypto')
const storage = require('../storage/index')

module.exports = function isAuthenticated(req, res, next) {
  const xkey = req.header('X-Key') // key
  const xroute = req.header('X-Route') // route of request
  const xsignature = req.header('X-Signature') // HMAC-SHA256 sig
  const auth = storage.getKeyPair(xkey)
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

  const recovered = HMACsha256(preImage, shared_secret).toString(Hex)
  const recoveredBuffer = Buffer.from(recovered, 'utf8')
  const providedBuffer = Buffer.from(xsignature, 'utf8')
  const authenticated = timingSafeEqual(recoveredBuffer, providedBuffer)

  if (authenticated) {
    return next()
  } else {
    res.status(403).send()
  }
}
