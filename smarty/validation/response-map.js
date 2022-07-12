// GOCART request -- same as Smarty request
const GoCartRequest = 
{
    "street": "2900 reading rd",
    "city": "cincinnati",
    "state": "ohio",
    "zipCode": "45219" 
} 

// ORIGINAL SMARTY response
const ORIGINALreponse = 
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


// SCRAPED DATA for GoCart standards
const SCRAPEDresponse = 
{
    "delivery_line": "2900 Reading Rd",
    "last_line": "Cincinnati OH 45206-1119",
    "components": {
      "primary_number": "2900",
      "street_name": "Reading",
      "street_suffix": "Rd",
      "city_name": "Cincinnati",
      "state_abbreviation": "OH",
      "zipcode": "45206",
      "plus4_code": "1119",
      "delivery_point": "00"
    },
    "vacant": "N"
  }


// function in AWS Lambda API

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