const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require('morgan')
const session = require('express-session');
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const config = require('./config');
const scheduleRoutes = require("./routes/API/scheduleAPI")
const userRoutes = require("./routes/API/userAPI");
const sessionRoutes = require("./routes/API/sessionAPI");
const contactRoutes = require('./routes/API/contactAPI')
const userSignUpRoutes = require('./routes/API/userSignUpAPI')
const userSubscriptionCancellationRoutes = require('./routes/API/userSubscriptionCancellationAPI')
const userSubscriptionUpdateRoutes = require('./routes/API/userSubscriptionUpdateAPI')
const convergePayRoutes = require('./routes/API/convergePayAPI')
const messageBoardRoutes = require('./routes/API/messageBoardAPI')
const passwordResetRoutes = require('./routes/API/passwordResetAPI')
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
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(express.json({limit: '50mb', type:'application/json'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000, type:'application/x-www-form-urlencoded'}));
// console.log('Limit file size: '+limit);
// app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.use('/gfitwefit/', express.static(path.join(__dirname, "client/build")));

app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(
  userRoutes, 
  sessionRoutes, 
  scheduleRoutes, 
  contactRoutes, 
  userSignUpRoutes,
  userSubscriptionCancellationRoutes,
  userSubscriptionUpdateRoutes,
  convergePayRoutes,
  messageBoardRoutes, 
  passwordResetRoutes
);

app.use(
  session({
    secret: 'fraggle-rock',
    resave: false,
    saveUninitialized: false
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || config.db);
const conn = mongoose.createConnection(process.env.MONGODB_URI || config.db);

//Init gfs
let gfs;

//HANDLE DISCONNECTIONS
conn.on('error', function(e){
  console.log("db: mongodb error " + e);
  debugger;
  // reconnect here
});

conn.on('connected', function(e){
  console.log('db: mongodb is connected');
});

conn.on('disconnecting', function(){
  console.log('db: mongodb is disconnecting!!!');
  debugger;
});

conn.on('disconnected', function(){
  console.log('db: mongodb is disconnected!!!');
  debugger;
});

conn.on('reconnected', function(){
  console.log('db: mongodb is reconnected');
});

conn.on('timeout', function(e) {
  console.log("db: mongodb timeout " + e);
  debugger;
  // reconnect here
});

conn.on('close', function() { 
  console.log('db: mongodb connection closed');
});

conn.once('open', function(err, database) {
  // Init stream
  if(err) throw err;
  
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
  db = database
})

app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI || config.db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage: storage,
  limits: { fileSize: '50mb' } });

var mongo = require('mongodb');
// var MongoClient = require('mongodb').MongoClient;
var GridFSBucket = mongo.GridFSBucket;
var ObjectID = require('mongodb').ObjectID;

function StreamGridFile(req, res, GridFile) {
  if(req.headers['range']) {
    // Range request, partialle stream the file
    // console.log('Range Request', GridFile);
    var parts = req.headers['range'].replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];


    var start = parseInt(partialstart, 10);

    var end = partialend ? parseInt(partialend, 10) : GridFile.length -1;
    var chunksize = (end-start)+1;
  
    res.writeHead(206, {
      'Content-disposition': 'filename=xyz',
      'Accept-Ranges': 'bytes',
      'Content-Type': GridFile.contentType,
      'Content-Range': 'bytes ' + start + '-' + end + '/' + GridFile.length,
      'Content-Length': chunksize
    });

    var readstream = gfs.createReadStream({
      _id: GridFile._id,
      range: {
        startPos: start,
        endPos: end
      }
    });
    readstream.pipe(res)

    // Set filepointer
    // GridFile.seek(start, function() {
    //   // get GridFile stream
    //   var stream = GridFile.stream(true);

    //   // write to response
    //   stream.on('data', function(buff) {
    //     // count data to abort streaming if range-end is reached
    //     // perhaps theres a better way?
    //     if(start >= end) {
    //       // enough data send, abort
    //       GridFile.close();
    //       res.end();
    //     } else {
    //       res.write(buff);
    //     }
    //   });
    // });

  } else {

    // stream back whole file
    console.log('No Range Request');
    res.header('Content-Type', GridFile.contentType);
    res.header('Content-Length', GridFile.length);
    var readstream = gfs.createReadStream(GridFile.filename)
    readstream.pipe(res)
    // var stream = GridFile.stream(true);
    // stream.pipe(res);
  }
}

app.get('/video/:filename', function(req, res) {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    // Check if files exist
    if(!file || file.length === 0) {
      return res.status(404).json({
        err: 'No videos exist'
      })
    }

    // Check if video
    if(file.contentType === 'video/quicktime' || file.contentType === 'video/mp4') {
      // let newFileId = 
      //   crypto.randomBytes(24, (err, buf) => {
      //     if (err) {
      //       return reject(err);
      //     }
      //     const fileId = buf.toString('hex');
      //     return(fileId);
      //   });
      // console.log('NEW FILE ID: ', file._id)
      // Read output to browser
      // new GridFSBucket(db, new ObjectID(file._id), null, 'r').open(function(err, GridFile) {
      //   if(!GridFile) {
      //     res.send(404,'Not Found');
      //     return;
      //   }
        
      //   StreamGridFile(req, res, GridFile);
      // });
      StreamGridFile(req, res, file)
      // var readstream = gfs.createReadStream(file.filename)
      // readstream.pipe(res)
    } else {
      res.status(404).json({
        err: 'Not a video'
      })
    }
    
  })
  
});

function isInvalidRange (start, end, maxIdx) {
  return start !== start  // NaN
      || start < 0
      || end < start
      || start > maxIdx
}


// @route POST /upload
// @desc Uploads file to DB

app.post('/upload/:videoTitle/:videoDesc/:equipmentNeeded/:fitnessLevel/:workoutCategory/:sampleVideo', upload.single('file'), (req, res) => {
  // res.json({file: req.file})
  console.log('File sending: ', req.file)
  debugger;
  gfs.files.update({'filename': req.file.filename}, 
    {'$set': 
      {
        'videoTitle': req.params.videoTitle,
        'videoDesc': req.params.videoDesc,
        'equipmentNeeded': req.params.equipmentNeeded,
        'fitnessLevel': req.params.fitnessLevel,
        'workoutCategory': req.params.workoutCategory,
        'sampleVideo': req.params.sampleVideo
      },
    })
    res.redirect('/adminHome')
  // try {
  //     return res.status(201).json({
  //       message: 'File uploded successfully'
  //   });
  // } catch (error) {
  //   console.log('BIG ERROR: ', error)
  // }
  // } else {
  //  // err is the error received from MongoDb
  //  res.status(500).send('Something broke!', err)
  //  console.log('HUGE ERROR: ', err)
  // }
  
})

// @route GET /files
// @desc Display all files in JSON

app.get('/videos', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files exist
    if(!files || files.length === 0) {
      return res.status(404).json({
        err: 'No videos exist'
      })
    } else {
      files.map(file => {
        if(file.contentType === 'video/quicktime' || file.contentType === 'video/mp4') {
          file.isVideo === true
        } else {
          file.isVideo === false
        }
      })
    }

    // Files exist
    return res.json(files)
  })
})

app.get('/sampleVideos', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files exist
    if(!files || files.length === 0) {
      return res.status(404).json({
        err: 'No videos exist'
      })
    } else {
      files.map(file => {
        if(file.sampleVideo === true) {
          file.isVideo === true
        } else {
          file.isVideo === false
        }
      })
    }

    // Files exist
    return res.json(files)
  })
})

// @route GET /videos/:filename
// @desc Display single file in JSON

app.get('/videos/:filename', (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    // Check if files exist
    if(!file || file.length === 0) {
      return res.status(404).json({
        err: 'No videos exist'
      })
    }

    // File exists
    return res.json(file)
  })
})

// @route GET /video/:filename
// @desc Display video


// ORIGINAL GET VIDEO FILE 

// app.get('/video/:filename', (req, res) => {
//   gfs.files.findOne({filename: req.params.filename}, (err, file) => {
//     // Check if files exist
//     if(!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No videos exist'
//       })
//     }

//     // Check if video
//     if(file.contentType === 'video/quicktime' || file.contentType === 'video/mp4') {
//       // Read output to browser
//       StreamGridFile(req, res, file)
//       // var readstream = gfs.createReadStream(file.filename)
//       // readstream.pipe(res)
//     } else {
//       res.status(404).json({
//         err: 'Not a video'
//       })
//     }
    
//   })
// })

// @route DELETE /videos/:id
// @desc Delete video

app.delete('/videos/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, GridFSBucket) => {
    if(err) {
      return res.status(404).json({ err: err })
    }
    res.redirect('/adminHome')
  })
})


// @route GET /converge_token_req
// @desc Retrieves converge token for payment

app.get('/converge_token_req', (request, response) => {
  if (process.env.NODE_ENV === "development") {
    console.log('DEV ENVIRONMENT')
    var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
  } else {
    var proxy = process.env.QUOTAGUARDSTATIC_URL;
  }
  
  // var proxy = process.env.REACT_APP_QUOTAGUARD_URL;
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
      ssl_amount: '5.00'
    }
  }
  console.log('CONFIG: ', proxy, config.params)

  axios({
    method: 'post',
    url: url,
    httpsAgent: agent,
    params: {
      ssl_merchant_id: process.env.SSL_MERCHANT_ID,
      ssl_user_id: process.env.SSL_USER_ID,
      ssl_pin: process.env.SSL_PIN,
      ssl_transaction_type: 'ccsale',
      ssl_amount: '5.00'
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
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
