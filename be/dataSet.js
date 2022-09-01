// import sha256 from 'crypto-js/sha256';
// import HmacSHA256 from 'crypto-js/hmac-sha256';
// import Base64 from 'crypto-js/enc-base64';
const express=require('express');
const app=express();


// var inputArray = new Array(100);
// var apiHmacArray = new Array(100);

    
    const crypto = require('crypto');

    const clientId = "100000921";
    const scope = "openid";
    const stateId = crypto.randomUUID();
    const redirectUri = "http://localhost:2000/loginSuccessful";
    const requestUri = "https://up.epramaan.in/openid/jwt/processJwtAuthGrantRequest.do";
    const responseType = "code";
    const aesKey = "813f6791-6a37-41da-9836-f520c7225668";
    // for nonce and code challenge - crypto.randomBytes(16).toString('base64')
    
    const nonceValue=crypto.randomUUID();
    
    // const nonce = crypto.randomBytes(16).toString('hex');
    
    const randomString = require("randomstring");
    const base64url = require("base64url");
    const codeVerifier = crypto.randomUUID()
    //randomString.generate(16);
    const base64Digest = crypto
      .createHash("sha256")
      .update(codeVerifier)
      .digest("base64");
    console.log("Base64 Digest=code verifier: "+base64Digest);
    
    const codeChallenge = base64url.fromBase64(base64Digest);
    const code = "ak";
    
    const codeChallengeMethod = "S256";
    //     input value will be string of
    // "serviceId+aesKey+stateID+nonce+redirectionURI+scope+codeChallenge"
    const inputValue = clientId+aesKey+stateId+nonceValue+redirectUri+codeChallenge;
    
    // crypto.createHmac()
    // Initializing the createHmac method using secret
    const apiHmac = crypto.createHmac('sha256', aesKey)
    // Data to be encoded
    .update(inputValue)//input value
    // Defining encoding type
    .digest('base64');
    // Printing the output
    console.log("Hmac value Obtained is: ", apiHmac);  
    
    // inputArray[i] = inputValue;
    // apiHmacArray[i] = apiHmac;


// console.log("Array of input values: ")
// console.log(inputArray);

// console.log("Array of input values: ")
// console.log(apiHmacArray);




//const apiHmac = crypto.createHmac('SHA256', {aesKey}).update({inputValue}).digest('base64');

console.log("stateId = " + stateId);
console.log("nonce = " + nonceValue);
console.log("codeVerifier = " + codeVerifier);
console.log("codeChallenge = " + codeChallenge);
console.log("apiHmac = " + apiHmac);
console.log("inputValue = " + inputValue);


const link = "https://up.epramaan.in/openid/jwt/processJwtAuthGrantRequest.do?&scope=" + scope + "&response_type=" + responseType + "&redirect_uri=" + redirectUri + "&state=" + stateId + "&code-challenge_method=" + codeChallengeMethod + "&nonce=" + nonceValue + "&client_id=" + clientId + "&code_challenge=" + codeChallenge + "&request_uri=" + requestUri + "&apiHmac=" + apiHmac + "";

console.log(link);










app.listen(5000,()=>console.log('DataSet started on the port no 5000'));
