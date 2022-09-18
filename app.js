// importing modules
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
//variables
let gender; 
////////////

app.get("/", function(req, res){
    //res.sendFile(__dirname+"/index.html");
    res.render("index", {identity: gender });
});

app.post("/", function(req, res){
    let userName = req.body.userInput
let url = `https://api.genderize.io?name=${userName}`
    https.get(url, function(response){
        response.on("data", function(data){
            let nameData = JSON.parse(data)

            gender =  nameData.gender;

            res.redirect("/")
        });
    });
});



app.listen( process.env.PORT || 3000, function(){
    console.log("Server started at port 3000")
})