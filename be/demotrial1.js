const nodejose = require("node-jose");
const jose = require("jose");
const crypto = require("crypto");
const utf8 = require("utf8");
const sha256 = require("js-sha256");
const cryptoJS = require("crypto-js");

async function jweEncryption() {
  const rsaPublicKey = await jose.importJWK(
    {
      kty: "oct",
      k: "sNR_O3bqr1E2ryHcrkE_oQ4r5GRY2Vu4EtUI3TtRGJY",
    },
    "HS256"
  );

  const jwe = await new jose.CompactEncrypt(
    new TextEncoder().encode("ashish is a good boy")
  )
    .setProtectedHeader({ alg: "A256KW", enc: "A256GCM" })
    .encrypt(rsaPublicKey);

  console.log("jwe => " + jwe);
  // console.log("decryption*****************")
  const { plaintext, protectedHeader } = await jose.compactDecrypt(
    jwe,
    rsaPublicKey
  );

  console.log("protected header => "+ protectedHeader);
  console.log("plain text => "+ new TextDecoder().decode(plaintext));
}
jweEncryption();
