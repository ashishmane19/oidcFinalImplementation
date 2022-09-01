const express = require('express');
// const jwt=require('jsonwebtoken');
const app = express();
const crypto = require('crypto');
const nodejose = require('node-jose');
const jose = require('jose');
const utf8 = require('utf8');
const sha256 = require('js-sha256');


const nonce = 'f6f9401edecf4f6d905e5ece900f0f6e';
console.log('nonce => ' + nonce)
console.log('noncelength => ' + nonce.length)

const hash = crypto.createHash('md5').update(nonce).digest('hex');
console.log('hash => ' + hash)
console.log('hashlength => ' + hash.length)



app.listen(6550, () => console.log('Server started on the port no 6550'));
