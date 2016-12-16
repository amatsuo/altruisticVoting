var CryptoJS = require("crypto-js");
var key = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef");
var iv =  CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");

var secret = "Module1=10,Module2=200,Module3=5,Module4=10";

//crypted
var encrypted = CryptoJS.AES.encrypt(secret, key, {iv:iv});
//and the ciphertext put to base64
encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
encrypted = encodeURIComponent(encrypted);
console.log(encrypted);
