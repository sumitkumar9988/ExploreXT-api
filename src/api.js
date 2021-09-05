const express = require("express");
const dotenv = require("dotenv");
const mongoose=require('mongoose');
const serverless = require("serverless-http");
const File = require('./Models/fileModel');
const Folder = require('./Models/folderModel');
const app = express();
const router = express.Router();
dotenv.config();

app.use(express.json())
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

router.get("/",async (req, res) => {
  res.json({
    succuss: "yup!!!"
  });
});

router.post("/unlock",async (req, res) => {
      const code=req.body.code;
      if(code=="1111"){
         return res.status(201).json({
              "succuss":true
          })
      }
      return res.status(201).json({
        "succuss":false
    })
});

router.post("/createfolder",async (req, res) => {
    try{
      const {name,folder}=req.body;
      await Folder.create({
        name,folder  
      })     
      res.status(201).json({
        succuss: "true"
      });
    }catch(err){
      res.status(404).json({
          succuss: "fail",
          message:err
        });
    }
  
});

  router.post("/createfile", async (req, res) => {
      try{
        const {name,folder,data}=req.body;
        await File.create({
          name,folder  
        })    
        res.status(201).json({
          succuss: "true"
        });
      }catch(err){
        res.status(404).json({
            succuss: "fail",
            message:err
          });
      }
    
  });

  router.get("/file",async (req, res) => {
    try{
        const file=await File.find({}).populate('folder');
      res.status(201).json({
        succuss: "true",
        file:file
      });
    }catch(err){
      res.status(404).json({
          succuss: "fail",
          message:err
        });
    }})

    router.get("/file/:id",async (req, res) => {
        const id=req.params.id;
        try{
    
            const file=await File.findById(id).populate('folder');
            res.status(201).json({
              succuss: "true",
              file:file
            });
        }catch(err){
          res.status(404).json({
              succuss: "fail",
              message:err
            });
        }
});

router.get("/folder",async (req, res) => {
  
    try{
        const folder=await Folder.find({}).populate('file folder');
        res.status(201).json({
          succuss: "true",
          folder:folder
        });
     
    }catch(err){
      res.status(404).json({
          succuss: "fail",
          message:err
        });
    }
});

router.get("/folder/:id",async (req, res) => {
    const id=req.params.id;
    try{
        const folder=await Folder.findById(id).populate('file');
        res.status(201).json({
          succuss: "true",
          folder:folder
        });
      res.json({
        succuss: "true"
      });
    }catch(err){
      res.status(404).json({
          succuss: "fail",
          message:err
        });
    }
});
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);