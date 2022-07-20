const http = require('https');

// const embeddedKey = "122473203315445337"; // Emilio's Key
const embeddedKey = "122473637967676731"; // Nick's Key

// const referrer = "localhost";
const referrer = "3.135.109.198";

exports.handler = async (event) => {
    
    // user input address variables
    let searchItem = event["search"].replaceAll(" ", "+");
    
    // smarty aws return function
    return SmartyHttpRequest(searchItem).then((data) => {             // calls SmartyHttpRequest and returns data
        
        const error404 = {
            statusCode: 404,
            body: '404 Address Not Found',
        };
        
        const response200 = {                                  // parsed http response plus status code if successful
            statusCode: 200,
            body: data,
        };
        
        if(!Object.keys(data).length){ return error404; }
        

        return response200;
        
    });
};


function SmartyHttpRequest(searchItem) {
    
    // query string concatenation
    let addressString = "&search=" + searchItem;
    let geolocationTag = "&prefer_geolocation"
    let queryString = "?key=" + embeddedKey + addressString + geolocationTag;
        
    return new Promise((resolve, reject) => {  
        // http options for Smarty's API
        const options = {
            host: 'us-autocomplete-pro.api.smartystreets.com',
            path: '/lookup' + queryString,
            port: 443,
            method: 'GET',                                       // GET method
            headers: {
                'Host': 'us-autocomplete-pro.api.smartystreets.com',
                'Referer': referrer,
            },
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
