const nodejose = require('node-jose');
const jose = require('jose');
const crypto = require('crypto');
const utf8 = require('utf8');
const sha256 = require('js-sha256');
const cryptoJS = require('crypto-js');
//const pcks8=require('pkcs8');







async function jweEncryption(){



  let payload={"name":"Ashish Hanmant Mane","state":"MAHARASHTRA"};
  
  let publicKey={"kty":"oct","k":"cdacMumbai2022"};

  const algorithm = 'ES256'
 // const pkcs8 = `cdacMumbai2022`
 // const ecPrivateKey = await jose.importPKCS8(pkcs8, algorithm)
//  const rsaPublicKey = await jose.importJWK(
//   {
//     kty: 'RSA',
//     e: 'AQAB',
//     n: '12oBZRhCiZFJLcPg59LkZZ9mdhSMTKAQZYq32k_ti5SBB6jerkh-WzOMAO664r_qyLkqHUSp3u5SbXtseZEpN3XPWGKSxjsy-1JyEFTdLSYe6f9gfrmxkUF_7DTpq0gn6rntP05g2-wFW50YO7mosfdslfrTJYWHFhJALabAeYirYD7-9kqq9ebfFMF4sRRELbv9oi36As6Q9B3Qb5_C1rAzqfao_PCsf9EPsTZsVVVkA5qoIAr47lo1ipfiBPxUCCNSdvkmDTYgvvRm6ZoMjFbvOtgyts55fXKdMWv7I9HMD5HwE9uW839PWA514qhbcIsXEYSFMPMV6fnlsiZvQQ',
//   },
//   'PS256',
// )

// const keyy=jose.JWK.createKey("oct", 256, { alg: "A256GCM" }).
//          then(function(result) {
//            // {result} is a jose.JWK.Key
//            // {result.keystore} is a unique jose.JWK.KeyStore
//          });console.log("keyy =>"+keyy)

// ***************** KEYSTORE METHOD ********************************

         
    //      jose.JWK.asKeyStore(input).
    //  then(function(result) {
    //    // {result} is a jose.JWK.KeyStore
    //    keystore = result;
    //  });

    // let key = keystore.get(kid);

    //  keystore.generate("oct", 256, props).
    //     then(function(result) {
    //       // {result} is a jose.JWK.Key
    //       key = result;
    //     });
        
    //  output = keystore.toJSON(true);

// **************   SECRET GENERATION *******************
const secret = await jose.generateSecret('HS256')
console.log("secret generated >"+JSON.stringify(secret))


const jwe = await new jose.CompactEncrypt(
  new TextEncoder().encode(payload),
)
  .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
  .encrypt(secret)
      

console.log(jwe)


//const rawKey = console.crypto.getRandomValues(new Uint8Array(16));

//key ===   cdacMumbai2022
// const ecPublicKey = await jose.importJWK(
//   {
//     crv: 'P-256',
//     kty: 'EC',
//     x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
//     y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo',
//   },
//   'ES256',
// )



}

jweEncryption();