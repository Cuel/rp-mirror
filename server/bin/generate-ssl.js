const fs = require('fs')
const pem = require('pem')

const options = {
  days: 365,
  selfSigned: true
}

pem.createCertificate(options, (err, keys) => {
  if (err) throw err
  const service = keys.serviceKey
  const cert = keys.certificate

  fs.writeFileSync('../ssl/server.key', service, 'utf8')
  fs.writeFileSync('../ssl/server.crt', cert, 'utf8')
})
