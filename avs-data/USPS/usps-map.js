let res =  "{\"_declaration\":{\"_attributes\":{\"version\":\"1.0\",\"encoding\":\"UTF-8\"}},\"AddressValidateResponse\":{\"Address\":{\"Address2\":{\"_text\":\"2900 READING RD\"},\"City\":{\"_text\":\"CINCINNATI\"},\"State\":{\"_text\":\"OH\"},\"Zip5\":{\"_text\":\"45206\"},\"Zip4\":{\"_text\":\"1119\"},\"DeliveryPoint\":{\"_text\":\"00\"},\"CarrierRoute\":{\"_text\":\"C017\"},\"Footnotes\":{\"_text\":\"A\"},\"DPVConfirmation\":{\"_text\":\"Y\"},\"DPVCMRA\":{\"_text\":\"N\"},\"DPVFootnotes\":{\"_text\":\"AABB\"},\"Business\":{\"_text\":\"Y\"},\"CentralDeliveryPoint\":{\"_text\":\"N\"},\"Vacant\":{\"_text\":\"N\"}}}}"

let data = JSON.parse(res);


function ParseData(data){
    if(!Object.keys(data).length){ return {}; }
    
    let res = {};
    res.street = data["AddressValidateResponse"]["Address"]["Address2"]["_text"];
    res.city = data["AddressValidateResponse"]["Address"]["City"]["_text"];
    res.state = data["AddressValidateResponse"]["Address"]["State"]["_text"];
    res.zipcode = data["AddressValidateResponse"]["Address"]["Zip5"]["_text"];
    res.plus4_code = data["AddressValidateResponse"]["Address"]["Zip4"]["_text"];
    res.delivery_point = data["AddressValidateResponse"]["Address"]["DeliveryPoint"]["_text"];
    res.vacant = data["AddressValidateResponse"]["Address"]["Vacant"]["_text"];

    return(res);
}

console.log(ParseData(data));