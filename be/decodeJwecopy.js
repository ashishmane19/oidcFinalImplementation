const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const crypto = require("crypto");
const nodejose = require("node-jose");
const jose = require("jose");
const utf8 = require("utf8");
const sha256 = require("js-sha256");
const cryptoJS = require("crypto-js");
const forge = require("node-forge");

// installing and requiring panva jose library
const josepanva = require("@panva/jose");
const {
  JWE, // JSON Web Encryption (JWE)
  JWK, // JSON Web Key (JWK)
  JWKS, // JSON Web Key Set (JWKS)
  JWS, // JSON Web Signature (JWS)
  JWT, // JSON Web Token (JWT)
  errors, // errors utilized by @panva/jose
} = jose;

// const nonce = "f6f9401edecf4f6d905e5ece900f0f6e";

// nonce converted to byte array in java (length of array is 32)
// 102 54 102 57 52 48 49 101 100 101 99 102 52 102 54 100 57 48 53 101 53 101 99 101 57 48 48 102 48 102 54 101

// byte array mentioned above is hashed with sha256 algo and resultant byte array is as follows:(length of array is 32)
// -80 -44 127 59 118 -22 -81 81 54 -81 33 -36 -82 65 63 -95 14 43 -28 100 88 -39 91 -72 18 -43 8 -35 59 81 24 -106

async function jweDecoding() {
  const jwe =
    "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.658ziS-ythB9uiOxlj_ToPMvWbz9JsuyuU6-jZu9_AfrQUyFqvsMDg.TN_7Yr1h2DBGj3-3.VXs0HnDvVtoMe16mfie6QboDX4ax7jrL1mAq7tNeQtBPqmiscIMZSoCkiTFbGtOfJ1xHjuVtOx3cZvtpJVP0wSiB0_3yUUbHvdbxh9LmEAukNHsWhPuM-5WxcWj7qPJZAwg6H38jlWyX31QKOy3N2facvlF11UxQtM2CcguMJ4xJTDKCwUqvTT8cL0j53fBtiDt1NLyA-uMq0ue80LAfGqa2A2NJx6UnBSa9lWCOt9D0YyTKNM28DQSklYJxk1S4n-GmMLSllloP2_maTP-jtRvUzYN4AWigFBx0nokIi1K7oTd4AZYL5nFg50rebKLvyMAcmdhM76bQ4X9O1dfUbYZ92gzT1zfTjXejxj-lleUwukK3oTh0bkhFSMqEGTwzd9uRVId1WulOSEEwXmACzolwIiS1YVGECniz4swWeZ1_ifgYeDPmvKSFLVoMsxAI2ixHCE9Fpp-QGPxe_k-m7Is7qVwbeCGKB1uX-aYWH4zjT8Tikq_-e9GIr-O7o6zXpcBOa_R3N6smqROiZdzn-xpIoq6mVf27aFzcxfRliJg_CI3IfPaLbO4N9FO_87wEjWDKY4NOSMIy6m0v2miF3tH5KzeHjp3MskWx8b_sbaU92-_3JKKkDdGnPBpywUxRO_Kl8afYo4Kj0I3wXNc4_CX9zhWuMnXC-B8yC71pgqN85oQBCC3Yvzsk-MTMEKTQgI1gN2CsMugKmXRl85WacKH2h9RSsfLvYW8ZvwAgw8EQJa-amlFH3_-N8xzgwTYCFeRJc4In2Za3C_DBzIbWwdiNmpCwz1jV0aiMQxtiYkBoHjE-9Sau_sb35ItyeSGS8RLHEfxye7PDiGuH5tA7ZAIWHVGWFHYKlZsA72Sb5NBmaITpNbM3o46ikPPINHtvWnu6XBAZsKMJe7y8jSBGNcFpMOgTFCW0ms7zN_zC5uspRyaJmGHDDAJLPuIjRiDBU4G8GEDQKDEFgbMvSxjv4FGBsZmlwpgL8BFcL7uXqTy0aAIJaEKIGIlgYN4eaFMYVfd25uaGi0Sje3aW2b7atk8fNpM_72h83jhpiNpbChc_1re_AvWyT_JwtSY3xQ161B1X0hFsCUOcLV9z2EDyoklFQ97tvGp1KWGZJngV9_Co760iJmsQNm_bFySyjWYeX3IT1lRIeXGnA5r8tOsx4rHd_u2QGEEPBI9cHdMw5j3-T4bZ4jmE-KYOlsqACDYlCEG-_qjs3EK3XLy3FGtv7dGr9wPlFUkRB0eWWRph9PmNraIEVOBan1XkxOjJm74OmnKFb9Zs9rHdnY7KkzvW8_EjobV76wy0UOxcjScDLIXDrwJwF2ZbdYY4qFtWlDNgZUrom0Zn8DvCxMVxmpysBfyfgkAfPjSbeEypkg.MW2UJvylFnM_9f9U1QUcJA";

  const nonce = "f6f9401edecf4f6d905e5ece900f0f6e";

  //***************************************************Method 1***************************************************
  //This  method generates hash successfully but ,whether it matches with the one generate by java code has not been checked yet, because the method in java does not give the string of the hashed nonce, it directly gives the byte array.

  var privateKey = crypto
    .createHash("sha256")
    .update(nonce)
    .digest("base64url");
  const utf8Encode = new TextEncoder();
  const byteArrayHashHex = utf8Encode.encode(privateKey);
  console.log("byteArrayHashHex => " + byteArrayHashHex);
  console.log("without substr : " + privateKey);

  //  var enc = new TextEncoder(); // always utf-8
  //   console.log("unit 8 array "+enc.encode(privateKey));
  //key = jwk.JWK.from_json(privateKey)
  // const key= {"kid":"Missing Key ID","thumbprint":"fK-YV-K2S37B0IuKKk2wDUH_AIgY_Iv5hjqApKT1a3Y"}
  jose.jwtDecrypt(
    "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.658ziS-ythB9uiOxlj_ToPMvWbz9JsuyuU6-jZu9_AfrQUyFqvsMDg.TN_7Yr1h2DBGj3-3.VXs0HnDvVtoMe16mfie6QboDX4ax7jrL1mAq7tNeQtBPqmiscIMZSoCkiTFbGtOfJ1xHjuVtOx3cZvtpJVP0wSiB0_3yUUbHvdbxh9LmEAukNHsWhPuM-5WxcWj7qPJZAwg6H38jlWyX31QKOy3N2facvlF11UxQtM2CcguMJ4xJTDKCwUqvTT8cL0j53fBtiDt1NLyA-uMq0ue80LAfGqa2A2NJx6UnBSa9lWCOt9D0YyTKNM28DQSklYJxk1S4n-GmMLSllloP2_maTP-jtRvUzYN4AWigFBx0nokIi1K7oTd4AZYL5nFg50rebKLvyMAcmdhM76bQ4X9O1dfUbYZ92gzT1zfTjXejxj-lleUwukK3oTh0bkhFSMqEGTwzd9uRVId1WulOSEEwXmACzolwIiS1YVGECniz4swWeZ1_ifgYeDPmvKSFLVoMsxAI2ixHCE9Fpp-QGPxe_k-m7Is7qVwbeCGKB1uX-aYWH4zjT8Tikq_-e9GIr-O7o6zXpcBOa_R3N6smqROiZdzn-xpIoq6mVf27aFzcxfRliJg_CI3IfPaLbO4N9FO_87wEjWDKY4NOSMIy6m0v2miF3tH5KzeHjp3MskWx8b_sbaU92-_3JKKkDdGnPBpywUxRO_Kl8afYo4Kj0I3wXNc4_CX9zhWuMnXC-B8yC71pgqN85oQBCC3Yvzsk-MTMEKTQgI1gN2CsMugKmXRl85WacKH2h9RSsfLvYW8ZvwAgw8EQJa-amlFH3_-N8xzgwTYCFeRJc4In2Za3C_DBzIbWwdiNmpCwz1jV0aiMQxtiYkBoHjE-9Sau_sb35ItyeSGS8RLHEfxye7PDiGuH5tA7ZAIWHVGWFHYKlZsA72Sb5NBmaITpNbM3o46ikPPINHtvWnu6XBAZsKMJe7y8jSBGNcFpMOgTFCW0ms7zN_zC5uspRyaJmGHDDAJLPuIjRiDBU4G8GEDQKDEFgbMvSxjv4FGBsZmlwpgL8BFcL7uXqTy0aAIJaEKIGIlgYN4eaFMYVfd25uaGi0Sje3aW2b7atk8fNpM_72h83jhpiNpbChc_1re_AvWyT_JwtSY3xQ161B1X0hFsCUOcLV9z2EDyoklFQ97tvGp1KWGZJngV9_Co760iJmsQNm_bFySyjWYeX3IT1lRIeXGnA5r8tOsx4rHd_u2QGEEPBI9cHdMw5j3-T4bZ4jmE-KYOlsqACDYlCEG-_qjs3EK3XLy3FGtv7dGr9wPlFUkRB0eWWRph9PmNraIEVOBan1XkxOjJm74OmnKFb9Zs9rHdnY7KkzvW8_EjobV76wy0UOxcjScDLIXDrwJwF2ZbdYY4qFtWlDNgZUrom0Zn8DvCxMVxmpysBfyfgkAfPjSbeEypkg.MW2UJvylFnM_9f9U1QUcJA",
    privateKey
  );

  // ********************   python method    ************************
  // jwe_token=jose.JWE.
  // jwe_token.deserialise(jwe)
  // jwe.decrypt(privateKey)
  // decrypted_payload=jwe_token.payload.decode()
  // console.log(decrypted_payload)

  // byteArrayHashHex => 115, 78, 82, 47, 79, 51, 98, 113, 114, 49, 69, 50, 114, 121, 72, 99, 114, 107, 69, 47, 111, 81, 52, 114, 53, 71, 82, 89, 50, 86, 117, 52, 69, 116, 85, 73, 51, 84, 116, 82, 71, 74, 89, 61
  // without substr: sNR / O3bqr1E2ryHcrkE / oQ4r5GRY2Vu4EtUI3TtRGJY=

  //  var privateKey1 = crypto.createHash('sha256').update(nonce).digest('base64').substring(0, 32);
  //  console.log("with substr : " + privateKey1);

  //***************************************************Method 2***************************************************
  //This method generates string hash correct but the byte array equivalent of the same is not matching with the one which java code generates (for the same nonce value)

  // const utf8Encode = new TextEncoder();
  // const byteArray = utf8Encode.encode(nonce);
  // console.log("ByteArray =>  " + byteArray);
  // console.log("ByteArrayLength => " + byteArray.length);

  // const hash = sha256(byteArray);
  // console.log("Hash =>  " + hash);
  // const finalHash = utf8Encode.encode(hash);
  // console.log("finalHash => " + finalHash);
  // console.log("finalHashLength => " + finalHash.length);

  // output of the following above code:

  // ByteArray => 102, 54, 102, 57, 52, 48, 49, 101, 100, 101, 99, 102, 52, 102, 54, 100, 57, 48, 53, 101, 53, 101, 99, 101, 57, 48, 48, 102, 48, 102, 54, 101
  // ByteArrayLength => 32
  // Hash => b0d47f3b76eaaf5136af21dcae413fa10e2be46458d95bb812d508dd3b511896
  // finalHash => 98, 48, 100, 52, 55, 102, 51, 98, 55, 54, 101, 97, 97, 102, 53, 49, 51, 54, 97, 102, 50, 49, 100, 99, 97, 101, 52, 49, 51, 102, 97, 49, 48, 101, 50, 98, 101, 52, 54, 52, 53, 56, 100, 57, 53, 98, 98, 56, 49, 50, 100, 53, 48, 56, 100, 100, 51, 98, 53, 49, 49, 56, 57, 54
  // finalHashLength => 64

  //***************************************************Method 3***************************************************

  // let hashValue = cryptoJS.SHA256(nonce);
  // console.log("hashValue => " + hashValue)
  // let buffer = Buffer.from(hashValue.toString(cryptoJS.enc.Hex), 'hex');
  // console.log("buffer => " + buffer)
  // let array = new Uint8Array(buffer);
  // console.log("array => " + array)
  // console.log("arrayLength => " + array.length)

  //***************************************************Method 4***************************************************

  // function hash (){
  //     return CryptoJS.SHA256(nonce);
  //  }
  //  var cipher = (function(plaintext, nonce) {
  //                      passwordHash = hash(nonce);
  //                     //  var iv = CryptoJS.enc.Hex.parse('0000000000000000');
  //                      var cipher = CryptoJS.AES.encrypt(plaintext, passwordHash, {
  //                         //  iv: iv,
  //                          mode: CryptoJS.mode.CBC,
  //                          keySize: 256 / 32,
  //                          padding: CryptoJS.pad.Pkcs7
  //                      });
  //                      return cipher;
  //  })(plaintext, password);

  // cipherBase64 =  cipher.ciphertext.toString().hex2a().base64Encode();

  //***************************************************Method 5***************************************************

  // const keystore = nodejose.JWK.createKeyStore();
  // keystore.generate
  // keystore.add(hash);

  //  const { plaintext, protectedHeader } =  jose.compactDecrypt(jwe, keystore.get())

  //  console.log(protectedHeader)
  //  console.log(new TextDecoder().decode(plaintext))

  // ********************************************** ashish new method to decrypt ************************************

  // const keyobject = {kty:"John", key:"sNR_O3bqr1E2ryHcrkE_oQ4r5GRY2Vu4EtUI3TtRGJY"};
}

//const jwe =
//  'eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0.nyQ19eq9ogh9wA7fFtnI2oouzy5_8b5DeLkoRMfi2yijgfTs2zEnayCEofz_qhnL-nwszabd9qUeHv0-IwvhhJJS7GUJOU3ikiIe42qcIAFme1A_Fo9CTxw4XTOy-I5qanl8So91u6hwfyN1VxAqVLsSE7_23EC-gfGEg_5znew9PyXXsOIE-K_HH7IQowRrlZ1X_bM_Liu53RzDpLDvRz59mp3S8L56YqpM8FexFGTGpEaoTcEIst375qncYt3-79IVR7gZN1RWsWgjPatfvVbnh74PglQcATSf3UUhaW0OAKn6q7r3PDx6DIKQ35bgHQg5QopuN00eIfLQL2trGw.W3grIVj5HVuAb76X.6PcuDe5D6ttWFYyv0oqqdDXfI2R8wBg1F2Q80UUA_Gv8eEimNWfxIWdLxrjzgQGSvIhxmFKuLM0.a93_Ug3uZHuczj70Zavx8Q'

//***************************************method 6 22 august 2022 ************************/

jweDecoding();

const jwe =
  "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.658ziS-ythB9uiOxlj_ToPMvWbz9JsuyuU6-jZu9_AfrQUyFqvsMDg.TN_7Yr1h2DBGj3-3.VXs0HnDvVtoMe16mfie6QboDX4ax7jrL1mAq7tNeQtBPqmiscIMZSoCkiTFbGtOfJ1xHjuVtOx3cZvtpJVP0wSiB0_3yUUbHvdbxh9LmEAukNHsWhPuM-5WxcWj7qPJZAwg6H38jlWyX31QKOy3N2facvlF11UxQtM2CcguMJ4xJTDKCwUqvTT8cL0j53fBtiDt1NLyA-uMq0ue80LAfGqa2A2NJx6UnBSa9lWCOt9D0YyTKNM28DQSklYJxk1S4n-GmMLSllloP2_maTP-jtRvUzYN4AWigFBx0nokIi1K7oTd4AZYL5nFg50rebKLvyMAcmdhM76bQ4X9O1dfUbYZ92gzT1zfTjXejxj-lleUwukK3oTh0bkhFSMqEGTwzd9uRVId1WulOSEEwXmACzolwIiS1YVGECniz4swWeZ1_ifgYeDPmvKSFLVoMsxAI2ixHCE9Fpp-QGPxe_k-m7Is7qVwbeCGKB1uX-aYWH4zjT8Tikq_-e9GIr-O7o6zXpcBOa_R3N6smqROiZdzn-xpIoq6mVf27aFzcxfRliJg_CI3IfPaLbO4N9FO_87wEjWDKY4NOSMIy6m0v2miF3tH5KzeHjp3MskWx8b_sbaU92-_3JKKkDdGnPBpywUxRO_Kl8afYo4Kj0I3wXNc4_CX9zhWuMnXC-B8yC71pgqN85oQBCC3Yvzsk-MTMEKTQgI1gN2CsMugKmXRl85WacKH2h9RSsfLvYW8ZvwAgw8EQJa-amlFH3_-N8xzgwTYCFeRJc4In2Za3C_DBzIbWwdiNmpCwz1jV0aiMQxtiYkBoHjE-9Sau_sb35ItyeSGS8RLHEfxye7PDiGuH5tA7ZAIWHVGWFHYKlZsA72Sb5NBmaITpNbM3o46ikPPINHtvWnu6XBAZsKMJe7y8jSBGNcFpMOgTFCW0ms7zN_zC5uspRyaJmGHDDAJLPuIjRiDBU4G8GEDQKDEFgbMvSxjv4FGBsZmlwpgL8BFcL7uXqTy0aAIJaEKIGIlgYN4eaFMYVfd25uaGi0Sje3aW2b7atk8fNpM_72h83jhpiNpbChc_1re_AvWyT_JwtSY3xQ161B1X0hFsCUOcLV9z2EDyoklFQ97tvGp1KWGZJngV9_Co760iJmsQNm_bFySyjWYeX3IT1lRIeXGnA5r8tOsx4rHd_u2QGEEPBI9cHdMw5j3-T4bZ4jmE-KYOlsqACDYlCEG-_qjs3EK3XLy3FGtv7dGr9wPlFUkRB0eWWRph9PmNraIEVOBan1XkxOjJm74OmnKFb9Zs9rHdnY7KkzvW8_EjobV76wy0UOxcjScDLIXDrwJwF2ZbdYY4qFtWlDNgZUrom0Zn8DvCxMVxmpysBfyfgkAfPjSbeEypkg.MW2UJvylFnM_9f9U1QUcJA";

const nonce = "f6f9401edecf4f6d905e5ece900f0f6e";

function createMessageDigest() {
  // switch (digest.toUpperCase()) {
  //   case 'SHA-256':
  //   case 'SHA256':
  return forge.md.sha256.create();
  //   case 'SHA-512':
  //   case 'SHA512':
  //     return forge.md.sha512.create();
}
function generateSecretKey(algorithm, size) {
  if (algorithm === "AES") {
    const key = nonce;
    const md = createMessageDigest();
    md.update(key);
    return md.digest().getBytes(22);
  }
  throw new Error("Unsupported symmetric algorithm");
}

//    var final = generateSecretKey('AES','256');
//    console.log("final => " + final)
//    console.log("finalLength => " + final.length)

//    const utf8Encode = new TextEncoder();
//    const finalByteKeyArray = utf8Encode.encode(final);
//    console.log("finalByteKeyArray => " + finalByteKeyArray)
//    console.log("finalByteKeyArrayLength => " + finalByteKeyArray.length)

// async function checkEmailExist(email) {
//     // wait till the mysql connection gets opened
//     const connection = await db.openConnection2()

//     const emailStatement = `select email from user where email = '${email}'`

//     // wait till the query gets executed
//     const [emails] = await connection.execute(emailStatement)

//     connection.end()
//     return emails.length > 0
// }
// console.log("Decoded JWE => " + decodedJWE);
// var deco = jose.generalDecrypt

app.listen(5550, () => console.log("Server started on the port no 5550"));
