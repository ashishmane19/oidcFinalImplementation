const nodejose = require('node-jose');
const jose = require('jose');
const crypto = require('crypto');
const utf8 = require('utf8');
const sha256 = require('js-sha256');
const cryptoJS = require('crypto-js');


async function jweEncryption(){

    // const rsaPublicKey = await jose.importJWK(
    //     {
    //       kty: 'RSA',
    //       e: 'AQAB',
    //       n: '12oBZRhCiZFJLcPg59LkZZ9mdhSMTKAQZYq32k_ti5SBB6jerkh-WzOMAO664r_qyLkqHUSp3u5SbXtseZEpN3XPWGKSxjsy-1JyEFTdLSYe6f9gfrmxkUF_7DTpq0gn6rntP05g2-wFW50YO7mosfdslfrTJYWHFhJALabAeYirYD7-9kqq9ebfFMF4sRRELbv9oi36As6Q9B3Qb5_C1rAzqfao_PCsf9EPsTZsVVVkA5qoIAr47lo1ipfiBPxUCCNSdvkmDTYgvvRm6ZoMjFbvOtgyts55fXKdMWv7I9HMD5HwE9uW839PWA514qhbcIsXEYSFMPMV6fnlsiZvQQ',
    //     },
    //     'PS256',
    //   )


    const nonce = "f6f9401edecf4f6d905e5ece900f0f6e";

    //********************Method 1***************************************************
    //This  method generates hash successfully but ,whether it matches with the one generate by java code has not been checked yet, because the method in java does not give the string of the hashed nonce, it directly gives the byte array.


    var privateKey = crypto.createHash('sha256').update(nonce).digest('base64url');
    const utf8Encode = new TextEncoder();
    const byteArrayHashHex = utf8Encode.encode(privateKey)
    console.log("byteArrayHashHex => " + byteArrayHashHex)
    console.log("without substr privatekey: " + privateKey);



const jwe = await new jose.CompactEncrypt(
    new TextEncoder().encode('It’s a dangerous business, Frodo, going out your door.'),
  )
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
    .encrypt(privateKey)
  


   

  console.log(jwe);
    }
    jweEncryption();