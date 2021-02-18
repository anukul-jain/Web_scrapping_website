const express=require("express");
const app=express();
const bp=require("body-parser");
const request=require('request');
const h2p = require('html2plaintext');
const mysql = require('mysql');
const mongo = require('mongodb');
const { htmlToText } = require('html-to-text');
let alert = require('alert');  
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@cluster0.hzpgm.mongodb.net/contenturl?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const contSchema=new mongoose.Schema({
    website : String,
    txt     : String
});
const fs = require('fs');
app.use(express.static("public"));
app.use(bp.urlencoded({extended : true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index1.html");
});
var username,pass;

app.post("/",function(req,res){
     username=req.body.username;
     pass=req.body.password;
    if(username=="anukul"&&pass=="123")
        res.redirect('/page2');
    else if(username=="jain"&&pass=="456")
        res.redirect('/page2');
    else if(username=="saarthi"&&pass=="789")
        res.redirect('/page2');
    else{
        res.redirect('/');
    }
    
});
app.get("/page2",function(req,res){
    
    //res.send("yes"+username);
    if((username=="anukul"&&pass=="123"))
        res.sendFile(__dirname + "/index2.html");
    else if(username=="jain"&&pass=="456")
        res.sendFile(__dirname + "/index2.html");
    else if(username=="saarthi"&&pass=="789")
        res.sendFile(__dirname + "/index2.html");
    else
        res.redirect('/');
});
var t,x;
app.get("/page3",function(req,res){
    if((username=="anukul"&&pass=="123"))
        res.sendFile(__dirname + "/index3.html");
    else if(username=="jain"&&pass=="456")
        res.sendFile(__dirname + "/index3.html");
    else if(username=="saarthi"&&pass=="789")
        res.sendFile(__dirname + "/index3.html");
    else
        res.redirect('/');
    
});
app.post("/page2",function(req,res){
    x=req.body.url;   
   var text;
   request(
       {uri:x, 
   }, function(error,response,body){
       text=body;
       t = h2p(text);
       fs.writeFile('public/example.txt', t, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      });
       const Cont=mongoose.model("URL",contSchema );
        const cont= new Cont({
       website :x,
       txt:t
   }) ;
   cont.save();
      //console.log(t);
      res.redirect('/page3');
   });  
   
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
console.log("Server has started succesfully");
});

