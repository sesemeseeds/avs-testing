const axios = require('axios')

axios.post('https://api.postgrid.com/v1/addver/verifications', {
        address: {
            line1: '2900 reading rd',
            line2: '',
            city: 'cincinnati',
            provinceOrState: "OH",
            postalOrZip: '45219',
            zipPlus4: '',
            firmName: '',
            country: '',
            errors: '',
            status: '',
            details: '',
            geocodeResult: ''
        }
    }, {
        headers: {
            'x-api-key': 'live_sk_eZYFkP1M7GB3V1AjQjZZt1'                               // LIVE API KEY
        }
    }).then((res) => {
        const { data } = res.data;

        // All the missing information is automatically appended.
        console.log(JSON.stringify(data));
    }).catch(console.error);