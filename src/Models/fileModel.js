const mongoose = require("mongoose");

const fileModel = new mongoose.Schema({
        name:{
            type:String
        },
        path:{
            type:String
        },
        folder:{
            type: mongoose.Schema.ObjectId,
            ref: "Folder",
          },
        data:{
            type:String
        } 

});

const File = mongoose.model("File", fileModel);

module.exports = File;
