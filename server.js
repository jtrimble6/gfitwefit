const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require('morgan')
const session = require('express-session');
const config = require('./config');
const scheduleRoutes = require("./routes/API/scheduleAPI")
const userRoutes = require("./routes/API/userAPI");
const sessionRoutes = require("./routes/API/sessionAPI");
const contactRoutes = require('./routes/API/contactAPI')
const convergePayRoutes = require('./routes/API/convergePayAPI')
// const videoRoutes = require('./routes/API/videoAPI/video')
const passport = require('./server/passport');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const axios = require('axios'); 
let httpsProxyAgent = require('https-proxy-agent');
require('dotenv').config();

// Define middleware here
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.use('/gfitwefit/', express.static(path.join(__dirname, "client/build")));

app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(userRoutes, sessionRoutes, scheduleRoutes, contactRoutes, convergePayRoutes);

app.use(
  session({
    secret: 'fraggle-rock',
    resave: false,
    saveUninitialized: false
  })
);

//DUPLICATE CODE AS ABOVE W/ ONE ADDITIONAL LINE OF CODE
// app.use(
//   session({
//     secret: 'fraggle-rock',
//     store: new MongoStore({ mongooseConnection: dbConnection }),
//     resave: false,
//     saveUninitialized: false
//   })
// );

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// app.use( (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   // console.log('req.session', req.session);
//   return next();
// });

// app.get('/signup', (req, res) => {
//   request(
//     { url: 'https://localhost:3000/signup' },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: err.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   )
// });

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || config.db);

app.get('/converge_token_req', (request, response) => {
  var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
  var agent = new httpsProxyAgent(proxy);
  let url = 'https://api.demo.convergepay.com/hosted-payments/transaction_token'
  var config = {
    url: url,
    httpsAgent: agent,
    params: {
      ssl_merchant_id: process.env.SSL_MERCHANT_ID,
      ssl_user_id: process.env.SSL_USER_ID,
      ssl_pin: process.env.SSL_PIN,
      ssl_transaction_type: 'ccsale',
      ssl_amount: '1.00'
    }
  }

  axios({
    method: 'post',
    url: url,
    httpsAgent: agent,
    params: {
      ssl_merchant_id: process.env.SSL_MERCHANT_ID,
      ssl_user_id: process.env.SSL_USER_ID,
      ssl_pin: process.env.SSL_PIN,
      ssl_transaction_type: 'ccsale',
      ssl_amount: '1.00'
    }
    }).then((res) => {
        response.send(res.data)
    }).catch((error) => {
        console.log('there was an error getting transaction token: ', error)
    })

})

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
