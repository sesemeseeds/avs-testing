// TESTING JSON STUFF

let res = 
[{"input_index":0,"res_index":0,"delivery_line_1":"2900 Reading Rd","last_line":"Cincinnati OH 45206-1119","delivery_point_barcode":"452061119001","components":{"primary_number":"2900","street_name":"Reading","street_suffix":"Rd","city_name":"Cincinnati","default_city_name":"Cincinnati","state_abbreviation":"OH","zipcode":"45206","plus4_code":"1119","delivery_point":"00","delivery_point_check_digit":"1"},"metadata":{"record_type":"S","zip_type":"Standard","county_fips":"39061","county_name":"Hamilton","carrier_route":"C017","congressional_district":"01","rdi":"Commercial","elot_sequence":"0066","elot_sort":"A","latitude":39.13233,"longitude":-84.49729,"precision":"Zip9","time_zone":"Eastern","utc_offset":-5,"dst":true},"analysis":{"dpv_match_code":"Y","dpv_footnotes":"AABB","dpv_cmra":"N","dpv_vacant":"N","dpv_no_stat":"N","active":"Y","footnotes":"N#"}}]

// console.log(res['deliveryLine1']);
// console.log(res['metadata']['countyName']);
let data = [];
data.deliveryLine = res[0]['delivery_line_1'];
data.last_line = res[0]['last_line'];
data.components = {};
data.components.primary_number = res[0]['components']['primary_number'];
data.components.street_name = res[0]['components']['street_name'];
data.components.street_suffix = res[0]['components']['street_suffix'];
data.components.city_name = res[0]['components']['city_name'];
data.components.default_city_name = res[0]['components']['default_city_name'];
data.components.state_abbreviation = res[0]['components']['state_abbreviation'];
data.components.zipcode = res[0]['components']['zipcode'];
data.components.plus4_code = res[0]['components']['plus4_code'];
data.components.county_name = res[0]['metadata']['county_name'];
data.components.delivery_point = res[0]['components']['delivery_point'];
data.active = res[0]['analysis']['active'];
console.log(data);
