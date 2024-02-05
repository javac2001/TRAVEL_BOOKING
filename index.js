const express = require('express');
const app = express();
const port = 8080;
let path = require('path');
const mongoose = require('mongoose');

// MONGOOSE SETUP
main()
.then(()=>{
    console.log("CONNECTED TO DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderland');
}

// EXPRESS SETUP
app.listen(port,()=>{
    console.log(`Lisining port ${port}`);
});

app.get("/",(req, res)=>{
    res.send("THIS IS ROOT");
});