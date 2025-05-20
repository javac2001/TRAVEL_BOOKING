const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require('mongoose');
const dataListingModules = require("./models/dataListingModules.js")
const methodOverride = require('method-override');
const engine = require('ejs-mate');

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// EJS-Mate
app.engine('ejs', engine);
// Add CSS and JS
app.use(express.static(path.join(__dirname, "public")));
// Handling POST request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Method Override
app.use(methodOverride('_method'));


// Mongoose DataBase Connection

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/StayFinder');
}
main().then(() => { console.log("Connection Established by MONGOOSE") }).catch((err) => { console.log(err); })

// =====================================================

// Root Route
app.get("/", (req, res) => {
    res.redirect("/stayfinder")
})
// =====================================================

// Index Route
app.get("/stayfinder", async (req, res) => {
    try {
        let data = await dataListingModules.find();
        res.render("routes/index.ejs", { data });
    } catch (error) {
        console.log(error);
    }
})
// =====================================================

// Show Route
app.get("/stayfinder/:id/show", async (req, res) => {
    try {
        let { id } = req.params;
        let data = await dataListingModules.findById(id);
        res.render("routes/show.ejs", { data });
    } catch (error) {
        console.log(error);
    }
})
// =====================================================

// Create Route
app.get("/stayfinder/create", (req, res) => {
    res.render("routes/create.ejs")
})

app.post("/stayfinder", async (req, res) => {
    try {
        let data = req.body.listing;
        await dataListingModules.insertOne(data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        console.log(data);
        res.redirect("/stayfinder");
    } catch (error) {
        console.log(error);
    }
})
// =====================================================

// Update Route
app.get("/stayfinder/:id/edit", async (req, res) => {
    try {
        let { id } = req.params;
        let data = await dataListingModules.findById(id);
        console.log(data);
        res.render("routes/edit.ejs", { data })
    } catch (error) {
        console.log(error);
    }
})
app.put("/stayfinder/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let data = req.body.listing;
        await dataListingModules.findByIdAndUpdate(id, data, { runValidator: true }, { new: true })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        res.redirect("/stayfinder");
    } catch (error) {
        console.log(error);
    }
})
// =====================================================

// Delete Route
app.delete("/stayfinder/:id", async (req, res) => {
    try {
        let { id } = req.params;
        await dataListingModules.findByIdAndDelete(id)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        res.redirect("/stayfinder");
    } catch (error) {
        console.log(error);
    }
})
// =====================================================


app.listen(port, () => {
    console.log(`Connected to ${port}`);
})