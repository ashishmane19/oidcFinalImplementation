const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const crypto = require('crypto');
const nodejose = require('node-jose');
const jose = require('jose');
const utf8 = require('utf8');
const sha256 = require('js-sha256');
const cryptoJS = require('crypto-js');
const forge = require('node-forge');



async function jweDecoding() {
    const jwe =
        'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.658ziS-ythB9uiOxlj_ToPMvWbz9JsuyuU6-jZu9_AfrQUyFqvsMDg.TN_7Yr1h2DBGj3-3.VXs0HnDvVtoMe16mfie6QboDX4ax7jrL1mAq7tNeQtBPqmiscIMZSoCkiTFbGtOfJ1xHjuVtOx3cZvtpJVP0wSiB0_3yUUbHvdbxh9LmEAukNHsWhPuM-5WxcWj7qPJZAwg6H38jlWyX31QKOy3N2facvlF11UxQtM2CcguMJ4xJTDKCwUqvTT8cL0j53fBtiDt1NLyA-uMq0ue80LAfGqa2A2NJx6UnBSa9lWCOt9D0YyTKNM28DQSklYJxk1S4n-GmMLSllloP2_maTP-jtRvUzYN4AWigFBx0nokIi1K7oTd4AZYL5nFg50rebKLvyMAcmdhM76bQ4X9O1dfUbYZ92gzT1zfTjXejxj-lleUwukK3oTh0bkhFSMqEGTwzd9uRVId1WulOSEEwXmACzolwIiS1YVGECniz4swWeZ1_ifgYeDPmvKSFLVoMsxAI2ixHCE9Fpp-QGPxe_k-m7Is7qVwbeCGKB1uX-aYWH4zjT8Tikq_-e9GIr-O7o6zXpcBOa_R3N6smqROiZdzn-xpIoq6mVf27aFzcxfRliJg_CI3IfPaLbO4N9FO_87wEjWDKY4NOSMIy6m0v2miF3tH5KzeHjp3MskWx8b_sbaU92-_3JKKkDdGnPBpywUxRO_Kl8afYo4Kj0I3wXNc4_CX9zhWuMnXC-B8yC71pgqN85oQBCC3Yvzsk-MTMEKTQgI1gN2CsMugKmXRl85WacKH2h9RSsfLvYW8ZvwAgw8EQJa-amlFH3_-N8xzgwTYCFeRJc4In2Za3C_DBzIbWwdiNmpCwz1jV0aiMQxtiYkBoHjE-9Sau_sb35ItyeSGS8RLHEfxye7PDiGuH5tA7ZAIWHVGWFHYKlZsA72Sb5NBmaITpNbM3o46ikPPINHtvWnu6XBAZsKMJe7y8jSBGNcFpMOgTFCW0ms7zN_zC5uspRyaJmGHDDAJLPuIjRiDBU4G8GEDQKDEFgbMvSxjv4FGBsZmlwpgL8BFcL7uXqTy0aAIJaEKIGIlgYN4eaFMYVfd25uaGi0Sje3aW2b7atk8fNpM_72h83jhpiNpbChc_1re_AvWyT_JwtSY3xQ161B1X0hFsCUOcLV9z2EDyoklFQ97tvGp1KWGZJngV9_Co760iJmsQNm_bFySyjWYeX3IT1lRIeXGnA5r8tOsx4rHd_u2QGEEPBI9cHdMw5j3-T4bZ4jmE-KYOlsqACDYlCEG-_qjs3EK3XLy3FGtv7dGr9wPlFUkRB0eWWRph9PmNraIEVOBan1XkxOjJm74OmnKFb9Zs9rHdnY7KkzvW8_EjobV76wy0UOxcjScDLIXDrwJwF2ZbdYY4qFtWlDNgZUrom0Zn8DvCxMVxmpysBfyfgkAfPjSbeEypkg.MW2UJvylFnM_9f9U1QUcJA';

    const nonce = "f6f9401edecf4f6d905e5ece900f0f6e";

    //********************Method 1***************************************************
    //This  method generates hash successfully but ,whether it matches with the one generate by java code has not been checked yet, because the method in java does not give the string of the hashed nonce, it directly gives the byte array.


    var privateKey = crypto.createHash('sha256').update(nonce).digest('base64url');
    const utf8Encode = new TextEncoder();
    const byteArrayHashHex = utf8Encode.encode(privateKey)
    //console.log("byteArrayHashHex => " + byteArrayHashHex)
    console.log("without substr privatekey: " + privateKey);




   
  //******************unit 8 array conversion *********************************/

  var enc = new TextEncoder(); // always utf-8
  var u8a = enc.encode(privateKey);
  console.log("unit 8 array "+u8a);
  
  //***********   compact decrypt method from jwt.io  ****************/
           //   const { plaintext, protectedHeader } =  jose.compactDecrypt(jwe, u8a)
           //   console.log(protectedHeader)
           //   console.log(new TextDecoder().decode(plaintext))
  
  //key = jwk.JWK.from_json(privateKey)
  //const key= {"kid":"Missing Key ID","thumbprint":"fK-YV-K2S37B0IuKKk2wDUH_AIgY_Iv5hjqApKT1a3Y"}
  //  jose.jwtDecrypt(
  //     jwe,
  //     u8a
  //    )
    

}



jweDecoding();



const jwe =
    'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.658ziS-ythB9uiOxlj_ToPMvWbz9JsuyuU6-jZu9_AfrQUyFqvsMDg.TN_7Yr1h2DBGj3-3.VXs0HnDvVtoMe16mfie6QboDX4ax7jrL1mAq7tNeQtBPqmiscIMZSoCkiTFbGtOfJ1xHjuVtOx3cZvtpJVP0wSiB0_3yUUbHvdbxh9LmEAukNHsWhPuM-5WxcWj7qPJZAwg6H38jlWyX31QKOy3N2facvlF11UxQtM2CcguMJ4xJTDKCwUqvTT8cL0j53fBtiDt1NLyA-uMq0ue80LAfGqa2A2NJx6UnBSa9lWCOt9D0YyTKNM28DQSklYJxk1S4n-GmMLSllloP2_maTP-jtRvUzYN4AWigFBx0nokIi1K7oTd4AZYL5nFg50rebKLvyMAcmdhM76bQ4X9O1dfUbYZ92gzT1zfTjXejxj-lleUwukK3oTh0bkhFSMqEGTwzd9uRVId1WulOSEEwXmACzolwIiS1YVGECniz4swWeZ1_ifgYeDPmvKSFLVoMsxAI2ixHCE9Fpp-QGPxe_k-m7Is7qVwbeCGKB1uX-aYWH4zjT8Tikq_-e9GIr-O7o6zXpcBOa_R3N6smqROiZdzn-xpIoq6mVf27aFzcxfRliJg_CI3IfPaLbO4N9FO_87wEjWDKY4NOSMIy6m0v2miF3tH5KzeHjp3MskWx8b_sbaU92-_3JKKkDdGnPBpywUxRO_Kl8afYo4Kj0I3wXNc4_CX9zhWuMnXC-B8yC71pgqN85oQBCC3Yvzsk-MTMEKTQgI1gN2CsMugKmXRl85WacKH2h9RSsfLvYW8ZvwAgw8EQJa-amlFH3_-N8xzgwTYCFeRJc4In2Za3C_DBzIbWwdiNmpCwz1jV0aiMQxtiYkBoHjE-9Sau_sb35ItyeSGS8RLHEfxye7PDiGuH5tA7ZAIWHVGWFHYKlZsA72Sb5NBmaITpNbM3o46ikPPINHtvWnu6XBAZsKMJe7y8jSBGNcFpMOgTFCW0ms7zN_zC5uspRyaJmGHDDAJLPuIjRiDBU4G8GEDQKDEFgbMvSxjv4FGBsZmlwpgL8BFcL7uXqTy0aAIJaEKIGIlgYN4eaFMYVfd25uaGi0Sje3aW2b7atk8fNpM_72h83jhpiNpbChc_1re_AvWyT_JwtSY3xQ161B1X0hFsCUOcLV9z2EDyoklFQ97tvGp1KWGZJngV9_Co760iJmsQNm_bFySyjWYeX3IT1lRIeXGnA5r8tOsx4rHd_u2QGEEPBI9cHdMw5j3-T4bZ4jmE-KYOlsqACDYlCEG-_qjs3EK3XLy3FGtv7dGr9wPlFUkRB0eWWRph9PmNraIEVOBan1XkxOjJm74OmnKFb9Zs9rHdnY7KkzvW8_EjobV76wy0UOxcjScDLIXDrwJwF2ZbdYY4qFtWlDNgZUrom0Zn8DvCxMVxmpysBfyfgkAfPjSbeEypkg.MW2UJvylFnM_9f9U1QUcJA';

const nonce = "f6f9401edecf4f6d905e5ece900f0f6e";












//app.listen(5550, () => console.log('Server started on the port no 5550'));
