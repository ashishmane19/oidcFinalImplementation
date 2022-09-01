const nodejose = require('node-jose');
const jose = require('jose');
const crypto = require('crypto');
const utf8 = require('utf8');
const sha256 = require('js-sha256');
const cryptoJS = require('crypto-js');
//const pcks8=require('pkcs8');


async function jweEncryption(){



    let payload={"name":"Ashish Hanmant Mane","state":"MAHARASHTRA"};
    
    //let ecPublicKey={"kty":"oct","k":"cdacMumbai2022"};

    const rsaPublicKey = await jose.importJWK(
        {
          kty: 'oct',
          e: 'AQAB',
          n: 'ashish',
          k:'cdacmumbai'
        },
        'PS256',
      )
  

        let key = await crypto.subtle.generateKey(
            {
              name: "AES-GCM",
              length: 256
            },
            true,
            ["encrypt", "decrypt"]
          );
  
  
          const jwe = await new jose.GeneralEncrypt(
            new TextEncoder().encode(payload),
          )
            .setProtectedHeader({ enc: 'A256GCM' })
            .addRecipient(key)

        
  
  console.log(jwe)
  
  

  
  }
  
  jweEncryption();