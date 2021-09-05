const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
    name:{
        type:String
    },
    folder:{
        type: mongoose.Schema.ObjectId,
        ref: "Folder",
      },
    file:[{
        type: mongoose.Schema.ObjectId,
        ref: "File",
      }]
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
