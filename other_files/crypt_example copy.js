var CryptoJS = require("crypto-js");
var key = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef");
var iv =  CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");

var secret = "M2a=20&M2b=30&M2=110&M3=100&M4R=20&M4=120&T=300&c=";

//crypted
var encrypted = CryptoJS.AES.encrypt(secret, key, {iv:iv});
//and the ciphertext put to base64
encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
encrypted = encodeURIComponent(encrypted);
console.log(encrypted);
