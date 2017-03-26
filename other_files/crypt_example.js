var CryptoJS = require("crypto-js");
var key = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef");
var iv =  CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");

var secret = "M2a=120,M2b=130,M2=110,M3=100,M4R=120,M4=120,T=1300,C=EWKD3EbkhOmwsFp9";

//crypted
var encrypted = CryptoJS.AES.encrypt(secret, key, {iv:iv});
//and the ciphertext put to base64
encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
encrypted = encodeURIComponent(encrypted);
console.log(encrypted);
