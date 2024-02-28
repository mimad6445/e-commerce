const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/Roles");



const UserShema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        uniq : true
    },
    email : {
        type : String,
        required : true,
        uniq : true ,
        validate : [validator.isEmail ," ivalid format of email"],
    },
    password : {
        type : String,
        required: true,
    },
    token : {
        type : String
    },
    role : {
        type : String,
        enum : [userRoles.USER,userRoles.ADMIN,userRoles.SUPER_ADMIN],
        default : userRoles.USER
    },
    avatar : {
        type : String,
        default : 'uploads/sajed.JPG'
    }
})

module.exports = mongoose.model("personns",UserShema);