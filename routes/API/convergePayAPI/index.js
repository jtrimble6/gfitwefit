var express = require('express');
var router = express.Router();
require('dotenv').config();

var axios = require('axios'); 
let httpsProxyAgent = require('https-proxy-agent');


// router.get('/payment', (req, res, next) => {
//     // var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
//     var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
//     var cors = "https://cors-anywhere.herokuapp.com/"
//     console.log(process.env.REACT_APP_QUOTAGUARD_URL)
//     console.log(process.env.QUOTAGUARDSTATIC_URL)
//     console.log(proxy)
//     var agent = new httpsProxyAgent(proxy);

//     var config = {
//         url: 'https://www.convergepay.com/hosted-payments/myip',
//         httpsAgent: agent
//     }

//     // console.log(config.url)
//     // console.log(agent)
//     axios.request(config).then((res) => console.log(res.data)).catch(err => console.log(err))
//   })

  router.post('/payment', (req, res, next) => {
    // var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
    var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
    var ssl_merchant_id = process.env.SSL_MERCHANT_ID;
    var ssl_user_id = process.env.SSL_USER_ID;
    var ssl_pin = process.env.SSL_PIN;
    var ssl_transaction_type = process.env.SSL_TRANSACTION_TYPE;
    var ssl_amount = process.env.SSL_AMOUNT;
    var agent = new httpsProxyAgent(proxy);
    let url = 'https://api.demo.convergepay.com/hosted-payments/transaction_token'
    let fullURL = 'https://api.demo.convergepay.com/hosted-payments/transaction_token' + '&ssl_merchant_id=' + ssl_merchant_id + '&ssl_user_id=' + ssl_user_id + '&ssl_pin=' + ssl_pin + '&ssl_transaction_type=' + ssl_transaction_type + '&ssl_amount=' + ssl_amount

    var config = {
        httpsAgent: agent,
    }

    var data = {
        ssl_merchant_id: ssl_merchant_id,
        ssl_user_id: ssl_user_id,
        ssl_pin: ssl_pin,
        ssl_transaction_type: ssl_transaction_type,
        ssl_amount: ssl_amount
    }

    // console.log("USING THIS DATA: ", url, data, config)

    axios.post(fullURL, null, config).then(response => (console.log(response)).catch(err => console.log(err)));

    // console.log(agent)
    // axios({
    //     method: 'GET',
    //     url: 'https://api.demo.convergepay.com/hosted-payments/transaction_token&ssl_merchant_id=' + ssl_merchant_id + '&ssl_user_id=' + ssl_user_id + '&ssl_pin=' + ssl_pin + '&ssl_transaction_type=' +ssl_transaction_type + '&ssl_amount=' + ssl_amount,
    //     httpsAgent: agent
    // }).then((res) => console.log(res)).catch(err => console.log(err))
    // axios.request(config).then((res) => console.log(res.data)).catch(err => console.log(err))
  })

module.exports = router;