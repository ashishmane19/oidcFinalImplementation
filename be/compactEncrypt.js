const jose = require('node-jose');


async function encrypt() {

const jwe = await jose.compactEncrypt(
    new TextEncoder().encode('It’s a dangerous business, Frodo, going out your door.'),
  )
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .encrypt(publicKey)
  
  console.log(jwe)
}

encrypt();