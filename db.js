const mongoose = require('mongoose');


const mongooseURI="mongodb://localhost:27017/inotebookdb";


const connectToMongo = async () => {
    mongoose.connect(mongooseURI, await console.log("Connected to mongo `Successful")
       );
   }
module.exports=connectToMongo;