const http = require('https');
const fs = require('fs');
const convert = require('xml-js');

const USERID = "054FISGL1145";

exports.handler = async (event) => {
    
    let address1 = event["address2"].replaceAll(" ", "%20");
    let address2 = event["address1"].replaceAll(" ", "%20");
    let address = address1 + address2;
    let city = event["city"].replaceAll(" ", "%20");
    let state = event["state"];
    let zipCode = event["zipCode"];
    
    return uspsResponse(address, city, state, zipCode).then((data) => {
        
        console.log(event);
        console.log(data);
        
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        };
        
        console.log(JSON.parse(JSON.stringify(response)));

    return response;

    })
}

function ParseData(data){
    if(!Object.keys(data).length){ return {}; }
    
    let res = {};
    res.address = data["AddressValidateResponse"]["Address"]["Address2"]["_text"];
    res.city = data["AddressValidateResponse"]["Address"]["City"]["_text"];
    res.state = data["AddressValidateResponse"]["Address"]["State"]["_text"];
    res.zipcode = data["AddressValidateResponse"]["Address"]["Zip5"]["_text"];
    res.plus4_code = data["AddressValidateResponse"]["Address"]["Zip4"]["_text"];
    res.delivery_point = data["AddressValidateResponse"]["Address"]["DeliveryPoint"]["_text"];
    res.vacant = data["AddressValidateResponse"]["Address"]["Vacant"]["_text"];

    return(res);
}

function uspsResponse(address, city, state, zipCode) {
    
    let addressString = "%22%3E%3CRevision%3E1%3C/Revision%3E%3CAddress%3E%3CAddress1%3E%3C/Address1%3E%3CAddress2%3E"+ address + "%3C/Address2%3E%3CCity%3E" + city + "%3C/City%3E%3CState%3E" + state +  "%3C/State%3E%3CZip5%3E" + zipCode + "%3C/Zip5%3E%3CZip4%3E%3C/Zip4%3E%3C/Address%3E%3C/AddressValidateRequest%3E";
    //'/ShippingAPI.dll?API=Verify&XML=%3CAddressValidateRequest%20USERID=%22054FISGL1145%22%3E%3CRevision%3E0%3C/Revision%3E%3CAddress%3E%3CAddress1%3ESuite%206100%3C/Address1%3E%3CAddress2%3E185%20Berry%20Street%3C/Address2%3E%3CCity%3ESan%20Francisco%3C/City%3E%3CState%3ECA%3C/State%3E%3CZip5%3E94556%3C/Zip5%3E%3CZip4%3E%3C/Zip4%3E%3C/Address%3E%3C/AddressValidateRequest%3E',
    return new Promise((resolve, reject) => {
        const options = {
            host: 'secure.shippingapis.com',
            path: '/ShippingAPI.dll?API=Verify&XML=%3CAddressValidateRequest%20USERID=%22' + USERID + addressString,
            port: 443,
            method: 'POST'
        }

        const req = http.request(options, (res) => {
            
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            
            // if statusCode 200 and data is recieved, the body is formatted and parsed here into a readible format
            var body = [];
            
            res.on('data', function(chunk) {                    
                body.push(chunk);
            });
            
            res.on('end', function() {
                try {
                    body = Buffer.concat(body);
                    var XMLString = body.toString();
                    var result1 = convert.xml2json(XMLString, {compact: true, spaces: 4});
                    result1 = ParseData(JSON.parse(result1));
                } catch(e) {
                    reject(e);
                }
                resolve(result1);
            });
        });
        
        // if error is recieved send error
        req.on('error', (e) => {
          reject(e.message);
        });
        
        // send the request
       req.end();
       
    });
}