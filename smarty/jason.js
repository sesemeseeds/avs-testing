// TESTING JSON STUFF

let candidate = 
{
    "inputIndex": 0,
    "candidateIndex": 0,
    "addressee": "Emilio",
    "deliveryLine1": "2900 Reading Rd",
    "lastLine": "Cincinnati OH 45206-1119",
    "deliveryPointBarcode": "452061119001",
    "components": {
      "primaryNumber": "2900",
      "streetName": "Reading",
      "streetSuffix": "Rd",
      "cityName": "Cincinnati",
      "defaultCityName": "Cincinnati",
      "state": "OH",
      "zipCode": "45206",
      "plus4Code": "1119",
      "deliveryPoint": "00",
      "deliveryPointCheckDigit": "1"
    },
    "metadata": {
      "recordType": "S",
      "zipType": "Standard",
      "countyFips": "39061",
      "countyName": "Hamilton",
      "carrierRoute": "C017",
      "congressionalDistrict": "01",
      "rdi": "Commercial",
      "elotSequence": "0066",
      "elotSort": "A",
      "latitude": 39.13233,
      "longitude": -84.49729,
      "coordinateLicense": "SmartyStreets",
      "precision": "Zip9",
      "timeZone": "Eastern",
      "utcOffset": -5,
      "obeysDst": true
    },
    "analysis": {
      "dpvMatchCode": "Y",
      "dpvFootnotes": "AABB",
      "cmra": "N",
      "vacant": "N",
      "noStat": "N",
      "active": "Y",
      "footnotes": "A#"
    }
}

// console.log(candidate['deliveryLine1']);
// console.log(candidate['metadata']['countyName']);
let data = [];
data.deliveryLine = candidate['deliveryLine1'];
data.lastLine = candidate['lastLine'];
data.components = candidate['components'];
data.components.countyName = candidate['metadata']['countyName'];
data.vacant = candidate['analysis']['vacant'];
data.active = candidate['analysis']['active'];
console.log(data);
