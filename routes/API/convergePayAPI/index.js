var express = require('express');
var router = express.Router();
require('dotenv').config();

var axios = require('axios'); 
let httpsProxyAgent = require('https-proxy-agent');


router.get('/payment', (req, res, next) => {
    // var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
    var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
    var cors = "https://cors-anywhere.herokuapp.com/"
    console.log(process.env.REACT_APP_QUOTAGUARD_URL)
    console.log(process.env.QUOTAGUARDSTATIC_URL)
    console.log(proxy)
    var agent = new httpsProxyAgent(proxy);

    var config = {
        url: cors + 'https://www.convergepay.com/hosted-payments/myip',
        httpsAgent: agent
    }

    // console.log(config.url)
    // console.log(agent)
    axios.request(config).then((res) => console.log(res.data)).catch(err => console.log(err))
  })

module.exports = router;