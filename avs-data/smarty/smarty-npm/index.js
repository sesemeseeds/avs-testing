// const https = require('https');
// const SmartyStreetsSDK = require("smartystreets-javascript-sdk");                                                    
// const SmartyStreetsCore = SmartyStreetsSDK.core;                                                                     
// const Lookup = SmartyStreetsSDK.usStreet.Lookup; 

// let authToken = "QNaGsqwstizKUv7RQtoc";																		
// let authId = "2c63367f-c98c-e049-b989-3af3509f931d";							

// let clientBuilder = new SmartyStreetsCore.ClientBuilder(new SmartyStreetsCore.StaticCredentials(authId, authToken));
// let client = clientBuilder.buildUsStreetApiClient();

// console.log("Step 1. Making a lookup.");

// let lookup = new Lookup();
// lookup.street = "2900 Reading Rd";
// lookup.city = "Cincinnati";
// lookup.state = "OH";
// lookup.zipCode = "45219";
// lookup.maxCandidates = 3;
// lookup.match = "invalid";

exports.handler = async (event) => {
    
    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello Lambda")
    };
    
    return response;
    
    // console.log("Step 2. Send the lookup.");
    // client.send(lookup)
    //     .then(handleSuccess)
    //     .catch(handleError);
        
    // function handleSuccess(response) {
    //     console.log("Step 3. Show the resulting candidate addresses:");
    //     let lookup = response.lookups[0];
    //     lookup.result.map(candidate => 
    //         response = {
    //             statusCode: 200,
    //             body: createData(candidate)
    //         }
    //     )
    //     return response;
    // }                                                                                                                    

    // function handleError(response) { console.log(response) }

    // function createData(candidate) {
    //     let data = {};
    //     data.deliveryLine = candidate['deliveryLine1'];
    //     data.lastLine = candidate['lastLine'];
    //     data.components = {};
    //     data.components.primaryNumber = candidate['components']['primaryNumber'];
    //     data.components.streetName = candidate['components']['streetName'];
    //     data.components.streetSuffix = candidate['components']['streetSuffix'];
    //     data.components.cityName = candidate['components']['cityName'];
    //     data.components.defaultCityName = candidate['components']['defaultCityName'];
    //     data.components.zipCode = candidate['components']['zipCode'];
    //     data.components.plus4Code = candidate['components']['plus4Code'];
    //     data.components.countyName = candidate['metadata']['countyName'];
    //     data.components.deliveryPoint = candidate['components']['deliveryPoint'];
    //     data.vacant = candidate['analysis']['vacant'];
    //     return data;
    // }
};
