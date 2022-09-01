const { response } = require('express');
const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
//const fetch = require("node-fetch");
//import { fetch } from 'node-fetch';




const cors = require('cors')
app.use(cors('*'))



var myHeaders = new Headers(init);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "upid=79797B9F8F5EA41D9A71E275F96FABE7");

var raw = JSON.stringify({
  "code": [
    "642eb71e-8b71-4a7d-b8cc-05ec90f0ba3c"
  ],
  "grant_type": [
    "authorization_code"
  ],
  "scope": [
    "openid"
  ],
  "redirect_uri": [
    "https://up.epramaan.in/openid/jwt/processJwtTokenRequest.do"
  ],
  "request_uri": [
    "http://localhost:2000/loginSuccessful"
  ],
  "code_verifier": [
    "6918ab80-6bc4-40d6-ba37-eced6e7d900d"
  ],
  "client_id": [
    "100000921"
  ]
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://up.epramaan.in/openid/jwt/processJwtTokenRequest.do", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


  app.listen(6060,()=>console.log('Server started on the port no 6060'));
