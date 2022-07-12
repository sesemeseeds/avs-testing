var https = require('follow-redirects').https;
var fs = require('fs');
var convert = require('xml-js');

var options = {
  'method': 'POST',
  'hostname': 'production.shippingapis.com',
  'path': '/ShippingAPI.dll?API=Verify&XML=%3CAddressValidateRequest%20USERID=%22054FISGL1145%22%3E%3CRevision%3E1%3C/Revision%3E%3CAddress%3E%3CAddress1%3ESuite%206100%3C/Address1%3E%3CAddress2%3E185%20Berry%20Street%3C/Address2%3E%3CCity%3ESan%20Francisco%3C/City%3E%3CState%3ECA%3C/State%3E%3CZip5%3E94556%3C/Zip5%3E%3CZip4%3E%3C/Zip4%3E%3C/Address%3E%3C/AddressValidateRequest%3E',
  'headers': {
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  //npm install xml-js
  //npm install --save xml-js
  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    var XMLString = body.toString();
    var result1 = convert.xml2json(XMLString, {compact: true, spaces: 4});
    console.log(result1);
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();