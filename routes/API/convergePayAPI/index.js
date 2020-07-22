var express = require('express');
var router = express.Router();
require('dotenv').config();

var axios = require('axios'); 
let httpsProxyAgent = require('https-proxy-agent');


router.post('/payment', (req, res) => {
    // var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
    var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
    var ssl_merchant_id = process.env.SSL_MERCHANT_ID;
    var ssl_user_id = process.env.SSL_USER_ID;
    var ssl_pin = process.env.SSL_PIN;
    var ssl_transaction_type = process.env.SSL_TRANSACTION_TYPE;
    var ssl_amount = process.env.SSL_AMOUNT;
    var agent = new httpsProxyAgent(proxy);
    var cors = "https://cors-anywhere.herokuapp.com/"
    let url = 'https://api.demo.convergepay.com/hosted-payments/transaction_token'
    let fullURL = 'https://api.demo.convergepay.com/hosted-payments/transaction_token' + '?ssl_merchant_id=' + ssl_merchant_id + '&ssl_user_id=' + ssl_user_id + '&ssl_pin=' + ssl_pin + '&ssl_transaction_type=' + ssl_transaction_type + '&ssl_amount=' + ssl_amount

    var config = {
        url: url,
        httpsAgent: agent,
        params: {
          ssl_merchant_id: ssl_merchant_id,
          ssl_user_id: ssl_user_id,
          ssl_pin: ssl_pin,
          ssl_transaction_type: ssl_transaction_type,
          ssl_amount: ssl_amount
        }
    }

    console.log('PARAMS: ', config.params)

    axios.request(config).then((res) => console.log('NEW RESPONSE: ', res)).catch(err => console.log('NEW ERROR: ', err))

  })

module.exports = router;