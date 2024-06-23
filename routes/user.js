const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
let router = express.Router({ mergeParams: true });
let User = require("../models/user");

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let registerUser = await new User({ username, email });
        let newUser = await User.register(registerUser, password);
        console.log(newUser);
        req.flash("success", "New user created");
        res.redirect("/listing");
    } catch (e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}))

module.exports = router;