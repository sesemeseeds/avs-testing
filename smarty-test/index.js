const http = require('https')

// Smarty API auth tokens and licenses for request
const authToken = "QNaGsqwstizKUv7RQtoc";                                         
const authId = "2c63367f-c98c-e049-b989-3af3509f931d";
const license = "us-core-cloud"                             // US address verification license

// testing with 2900 reading road cincinnati, OH 45219 -- kept hardcoded for testing purposes
let addressString = "&street=2900+reading+road&city=cincinnati&state=OH&zipCode=45219"

// queryString is added to the url path
let queryString = "?auth-id=" + authId + "&auth-token=" + authToken + "&license=" + license + addressString;

// exports.handler function for AWSlambda
exports.handler = async (event) => {
    return SmartyHttpRequest().then((data) => {                      // calls SmartyHttpRequest and returns data
        
        const response = {                                  // parsed http response plus status code if successful
            statusCode: 200,
            body: JSON.parse(JSON.stringify(data)),
        };

        console.log(response);                              // response logged in console

    return response;
    
    });
};



function SmartyHttpRequest() {
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
            
            if (res.statusCode < 200 || res.statusCode >= 300) {                        // error handling when code <200 or >=300 is recieved from Smarty -- reject
                return reject(new Error('statusCode=' + res.statusCode));
            }
            
            // if statusCode 200 and data is recieved, the body is formatted and parsed here into a readible format
            var body = [];
            
            res.on('data', function(chunk) {                    
                body.push(chunk);
            });
            
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
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