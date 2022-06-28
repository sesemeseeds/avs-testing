const http = require('https')

// Smarty API auth tokens and licenses for request
const authToken = "QNaGsqwstizKUv7RQtoc";                                        
const authId = "2c63367f-c98c-e049-b989-3af3509f931d";
const license = "us-core-cloud"                             // US address verification license

// exports.handler function for AWSlambda
exports.handler = async (event) => {
    
    // user input address variables
    let street = event["street"].replaceAll(" ", "+");
    let city = event["city"].replaceAll(" ", "+");
    let state = event["state"];
    let zipCode = event["zipCode"];
    
    // smarty aws return function
    return SmartyHttpRequest(street, city, state, zipCode).then((data) => {             // calls SmartyHttpRequest and returns data
        console.log(event)
        console.log(data);
        
        const error404 = {
            statusCode: 404,
            body: '404 Address Not Found',
        };
        
        const response200 = {                                  // parsed http response plus status code if successful
            statusCode: 200,
            body: JSON.stringify(data),
        };
        
        if(!Object.keys(data).length){ return error404; }
        

        return response200;
        
    });
};

function ParseData(data){
    
    if(!Object.keys(data).length){ return {}; }
    
    let res = {};
    res.delivery_line = data[0]['delivery_line_1'];
    res.last_line = data[0]['last_line'];
    res.components = {};
    res.components.primary_number = data[0]['components']['primary_number'];
    res.components.street_name = data[0]['components']['street_name'];
    res.components.street_suffix = data[0]['components']['street_suffix'];
    res.components.city_name = data[0]['components']['default_city_name'];
    res.components.state_abbreviation = data[0]['components']['state_abbreviation'];
    res.components.zipcode = data[0]['components']['zipcode'];
    res.components.plus4_code = data[0]['components']['plus4_code'];
    res.components.delivery_point = data[0]['components']['delivery_point'];
    
    if(data[0]['analysis']['active'] == 'Y') { res.vacant = 'N'; }
    else { res.vacant = data[0]['analysis']['active']; }

    return(res);
}

function SmartyHttpRequest(street, city, state, zipCode) {
    
    // query string concatenation
    let addressString = "&street=" + street + "&city=" + city + "&state=" + state + "&zipCode=" + zipCode;
    let queryString = "?auth-id=" + authId + "&auth-token=" + authToken + "&license=" + license + addressString;
        
    return new Promise((resolve, reject) => {  
        
        // http options for Smarty's API
        const options = {                                       
            host: 'us-street.api.smartystreets.com',
            path: '/street-address' + queryString,              
            port: 443,                                          
            method: 'GET'                                       // GET method
        };
        
        // request function and handling
        const req = http.request(options, (res) => {
            
            
            // error handling when code <200 or >=300 is recieved from Smarty -- reject
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
                    body = ParseData(JSON.parse(Buffer.concat(body).toString()));
                    
                } catch(e) {
                    reject(e);
                }
                resolve(body);
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