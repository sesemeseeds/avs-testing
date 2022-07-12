(async function main () {

	// SMARTY VERIFYING US STREET ADDRESSES SDK from https://github.com/smarty/smartystreets-javascript-sdk/blob/master/examples/us_street.js documentation: https://www.smarty.com/docs/sdk/javascript#source

	const SmartySDK = require("smartystreets-javascript-sdk");
	const SmartyCore = SmartySDK.core;
	const Lookup = SmartySDK.usAutocompletePro.Lookup;

	// US Autocomplete Pro only supports using Website Keys
	let key = 122473637536740147;
	const credentials = new SmartyCore.SharedCredentials(key);

	// The appropriate license values to be used for your subscriptions can be found on the Subscription page of the account dashboard. https://www.smarty.com/docs/cloud/licensing
	let clientBuilder = new SmartyCore.ClientBuilder(credentials).withLicenses(["us-autocomplete-pro-cloud"]);
	// .withBaseUrl("");
	let client = clientBuilder.buildUsAutocompleteProClient();

	// Documentation for input fields can be found at: https://www.smarty.com/docs/cloud/us-autocomplete-api#pro-http-request-input-fields


	let lookup = new Lookup("4770 Lincoln");

	await handleRequest(lookup, "Simple Lookup");

	// *** Using Filter and Prefer ***
	lookup = new Lookup("4770 Lincoln");

	lookup.maxResults = 10;
	lookup.includeOnlyCities = ["Chicago,La Grange,IL", "Blaine,WA"];
	lookup.preferStates = ["IL"];
	lookup.preferRatio = 33;
	lookup.source = "all";

	await handleRequest(lookup, "Using Filter and Prefer");

	// *** Using 'selected' to Expand Secondaries ***
	lookup = new Lookup("4770 Lincoln");

	lookup.selected = "4770 N Lincoln Ave Ste 2 (3) Chicago, IL 60625";

	await handleRequest(lookup, "Using 'selected' to Expand Secondaries")

	// ************************************************

	function logSuggestions(response, message) {
		console.log(message);
		console.log(response.result);
		console.log("*********************");
	}

	async function handleRequest(lookup, lookupType) {
		try {
			const results = await client.send(lookup);
			logSuggestions(results, lookupType);
		} catch(err) {
			console.log(err)
		}
	}
	
})();