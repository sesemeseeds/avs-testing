// SMARTY VERIFYING US STREET ADDRESSES SDK
// from https://github.com/smarty/smartystreets-javascript-sdk/blob/master/examples/us_street.js
// documentation: https://www.smarty.com/docs/sdk/javascript#source

const SmartyStreetsSDK = require("smartystreets-javascript-sdk");                                                    
const SmartyStreetsCore = SmartyStreetsSDK.core;                                                                     
const Lookup = SmartyStreetsSDK.usStreet.Lookup; 

// for Server-to-server requests, use this code:
let authToken = "QNaGsqwstizKUv7RQtoc";																		
let authId = "2c63367f-c98c-e049-b989-3af3509f931d";							
// const credentials = new SmartyCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
// let key = process.env.SMARTY_WEBSITE_KEY;
// const credentials = new SmartyCore.SharedCredentials(key);

// The appropriate license values to be used for your subscriptions
// can be found on the Subscription page of the account dashboard.
// https://www.smarty.com/docs/cloud/licensing
// let clientBuilder = new SmartyCore.ClientBuilder(credentials).withBaseUrl("YOUR URL").withLicenses(["us-rooftop-geocoding-cloud"]);

let clientBuilder = new SmartyStreetsCore.ClientBuilder(new SmartyStreetsCore.StaticCredentials(authId, authToken));
let client = clientBuilder.buildUsStreetApiClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/us-street-api#input-fields

console.log("Step 1. Make a lookup. (BTW, you can also send entire batches of lookups...)");

let lookup = new Lookup();
lookup.street = "99 ortiz pl";
lookup.city = "Cincinnati";
lookup.state = "OH";
lookup.zipCode = "45219";
lookup.maxCandidates = 3;
lookup.match = "invalid"; // "invalid" is the most permissive match,
                           // this will always return at least one result even if the address is invalid.
                           // Refer to the documentation for additional MatchStrategy options.

console.log("Step 2. Send the lookup.");
client.send(lookup)
        .then(handleSuccess)
        .catch(handleError);
                                                                                                                     
function handleSuccess(response) {
        console.log("Step 3. Show the resulting candidate addresses:");
        let lookup = response.lookups[0];
        lookup.result.map(candidate => console.log(
                createData(candidate)
                ));
}                                                                                                                    
                                                                                                                     
function handleError(response) 
{
        console.log(response)
}

function createData(candidate) {
        let data = {};
        data.deliveryLine = candidate['deliveryLine1'];
        data.lastLine = candidate['lastLine'];
        data.components = {};
        data.components.primaryNumber = candidate['components']['primaryNumber'];
        data.components.streetName = candidate['components']['streetName'];
        data.components.streetSuffix = candidate['components']['streetSuffix'];
        data.components.cityName = candidate['components']['cityName'];
        data.components.defaultCityName = candidate['components']['defaultCityName'];
        data.components.zipCode = candidate['components']['zipCode'];
        data.components.plus4Code = candidate['components']['plus4Code'];
        data.components.countyName = candidate['metadata']['countyName'];
        data.components.deliveryPoint = candidate['components']['deliveryPoint'];
        data.vacant = candidate['analysis']['vacant'];
        return data;
}
