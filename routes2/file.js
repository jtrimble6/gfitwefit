// const router = require('express').Router();
// const multer = require('multer');
// const { mongo, connection } = require('mongoose');
// const Grid = require('gridfs-stream');
// Grid.mongo = mongo;
// var gfs = Grid(connection.db);

// var MongoClient = require('mongodb').MongoClient
//   // Grid = mongo.Grid;

// // Connect to the db
// MongoClient.connect("mongodb://localhost:27017/gfitwefit", function(err, db) {
  
//   if(err) return console.dir(err);

//   var gfs = new Grid(db, 'fs');
//   var buffer = new Buffer("Hello world");
//   gfs.put(buffer, {metadata:{category:'text'}, content_type: 'text'}, function(err, fileInfo) {
//     if(!err) {
//       console.log("Finished writing file to Mongo");
//     }
//   });
// });

// // set up connection to db for file storage
// const storage = require('multer-gridfs-storage')({
//   db: connection.db,
//   file: (req, file) => {
//     return {
//       filename: file.originalname
//     }
//   }
// });
// // sets file input to single file
// const singleUpload = multer({ storage: storage }).single('file');
// router.get('/files/:filename', (req, res) => {
//   gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
//     if(!files || files.length === 0){
//       return res.status(404).json({
//         message: "Could not find file"
//       });
//     }
//     var readstream = gfs.createReadStream({
//       filename: files[0].filename
//     })
//     res.set('Content-Type', files[0].contentType);
//     return readstream.pipe(res);
//   });
// });
// router.get('/files', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     if(!files || files.length === 0){
//       return res.status(404).json({
//         message: "Could not find files"
//       });
//     }
//     return res.json(files);
//   })
// });
// router.post('/files', singleUpload, (req, res) => {
//   if (req.file) {
//     return res.json({
//       success: true,
//       file: req.file
//     });
//   }
//   res.send({ success: false });
// });
// router.delete('/files/:id', (req, res) => {
//   gfs.remove({ _id: req.params.id }, (err) => {
//     if (err) return res.status(500).json({ success: false })
//       return res.json({ success: true });
//     })
// })

const router = require('express').Router();
const multer = require('multer');
const { connection } = require('mongoose');
const Grid = require('gridfs-stream');
var mongo = require('mongodb');
// var Grid = require('gridfs-stream');
// create or use an existing mongodb-native db instance
var db = new mongo.Db('gfitwefit', new mongo.Server("127.0.0.1", 27017));
var gfs = Grid(db, mongo);
require('dotenv').config()
Grid.mongo = mongo;
var mongoDriver = connection.mongo;

// set up connection to db for file storage
// const storage = require('multer-gridfs-storage')({
//   db: connection.db,
//   file: (req, file) => {
//     return {
//       filename: file.originalname
//     }
//   }
// });

// streaming to gridfs
// var writestream = gfs.createWriteStream({
//   filename: 'my_file.txt'
// });
// fs.createReadStream('/some/path').pipe(writestream);

// // streaming from gridfs
// var readstream = gfs.createReadStream({
// filename: 'my_file.txt'
// });

// //error handling, e.g. file does not exist
// readstream.on('error', function (err) {
// console.log('An error occurred!', err);
// throw err;
// });

// readstream.pipe(response);

const storage = require('multer-gridfs-storage')({
  url: process.env.MONGO_URI,
  options: {
    useNewUrlParser: true
  },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      })
    })
  }
})

// sets file input to single file
const singleUpload = multer({ storage: storage }).single('file');
router.get('/files/:filename', (req, res) => {
  gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
    if(!files || files.length === 0){
      return res.status(404).json({
        message: "Could not find file"
      });
    }
    var readstream = gfs.createReadStream({
      filename: files[0].filename
    })
    res.set('Content-Type', files[0].contentType);
    return readstream.pipe(res);
  });
});
router.get('/files', (req, res) => {
  console.log('GETTING THE FILES')
  gfs.files.find().toArray((err, files) => {
    if(!files || files.length === 0){
      return res.status(404).json({
        message: "Could not find files"
      });
    }
    return res.json(files);
  });
})  
router.post('/files', singleUpload, (req, res) => {
  if (req.file) {
    return res.json({
      success: true,
      file: req.file
    });
  }
  res.send({ success: false });
});
router.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id }, (err) => {
    if (err) return res.status(500).json({ success: false })
      return res.json({ success: true });
    })
})

module.exports = router;
