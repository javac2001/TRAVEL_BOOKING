const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require('mongoose');

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Add CSS or JS
app.use(express.static(path.join(__dirname, "public")));
// Handling POST request
app.use(express.urlencoded({extended : true}));
app.use(express.json());


// Mongoose DataBase Connection

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/StayFinder');
}
main().then(()=> {console.log("Connection Established by MONGOOSE")}).catch((err)=>{console.log(err);})

// =====================================================


app.get("/",(req, res)=>{
    res.send("This is root")
})


app.listen(port,()=>{
    console.log(`Connected to ${port}`);
})