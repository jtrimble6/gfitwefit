//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port


// OLD CONNECTION STRING MLAB
mongoose.connect("mongodb://localhost/gfitwefit").then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('we have an error connecting to Mongo: ')
         console.log(err);
         
        }
  );


// // NEW CONNECTION STRING MONGO ATLAS
// mongoose.connect("mongodb+srv://heroku_nl39tpkm:beamerball6@clustertrimbledev.d37nq.mongodb.net/heroku_nl39tpkm?retryWrites=true&w=majority").then(
//     () => { 
//         /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
//         console.log('Connected to Mongo');
        
//     },
//     err => {
//          /** handle initial connection error */ 
//          console.log('we have an error connecting to Mongo: ')
//          console.log(err);
         
//         }
//   );


module.exports = mongoose.connection

