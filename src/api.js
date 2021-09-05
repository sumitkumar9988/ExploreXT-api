const express = require("express");
const serverless = require("serverless-http");
import File from './Models/fileModel';
import Folder from './Models/folderModel';
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    succuss: "yup!!!"
  });
});

router.post("/unlock", (req, res) => {
    try{
      const {code}=req.body;
      if(code==='0000')  {
        res.json({
            succuss: "true"
          });
      }   
     
    }catch(err){
      res.status(404).json({
          succuss: "fail",
          message:err
        });
    }
  
});

router.post("/createfolder", (req, res) => {
    try{
      const {name,folder}=req.body;
      await Folder.create({
        name,folder  
      })     
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

  router.post("/createfile", (req, res) => {
      try{
        const {name,folder,data}=req.body;
        await File.create({
          name,folder  
        })    
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

  router.get("/file", (req, res) => {
    try{
        const file=await File.find({}).populate('folder');
      res.json({
        succuss: "true",
        file:file
      });
    }catch(err){
      res.status(404).json({
          succuss: "fail",
          message:err
        });
    }})

    router.get("/file/:id", (req, res) => {
        const id=req.params.id;
        try{
    
            const file=await File.findById(id).populate('folder');
            res.json({
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

router.get("/folder", (req, res) => {
  
    try{
        const folder=await Folder.find({}).populate('file folder');
        res.json({
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

router.get("/folder/:id", (req, res) => {
    const id=req.params.id;
    try{
        const folder=await Folder.findById(id).populate('file');
        res.json({
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