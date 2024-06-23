const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email : {
        type : String,
        require : true
    }
});

userSchema.plugin(passportLocalMongoose);
let User = new mongoose.model("User", userSchema);
module.exports = User;