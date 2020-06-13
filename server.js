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


// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const logger = require('morgan');
// const config = require('./config');
// const mongoose = require('mongoose');
// const app = express();
// // connect to mongoose
// mongoose.connect(config.db);
// /** Seting up server to accept cross-origin browser requests */
// app.use(function(req, res, next) { //allow cross origin requests
//   res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });
// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
// app.use(bodyParser.json());
// app.use(logger('dev'));
// // Put all API endpoints under '/api'
// app.use('/api', require('./routes2/file'));
// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });
// const port = process.env.PORT || 3001;
// app.listen(port);
// console.log(`GridFS tutorial listening on ${port}`);
