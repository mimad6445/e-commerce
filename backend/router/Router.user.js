const express = require("express");
const router = express.Router();
const Usersdb = require("../model/user.model")
const httpStatusText = require("../utils/httpStatusText")
const bcrypt = require('bcrypt');
const generatetoken = require("../utils/generatetoken");
const asyncWrapper = require("../middleware/asyncWrapper");
const virefytoken = require("../middleware/virefytoken")
const usercontroller = require("../controller/user.controller")
const multer  = require('multer');
const AppError = require("../utils/AppError");




const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const filename = `user-${Date.now()}.${ext}`
        cb(null,filename)
    }
})
const upload = multer({ storage: diskStorage ,
fileFilter: (req,file,cb)=>{
    const filetype = file.mimetype.split('/')[0];
    if(filetype === "image"){
        return cb(null,true);
    }
    else{
        return cb(AppError.create("file must be image",400,httpStatusText.FAIL),false);
    }
}})


router.route('/')
    .get(virefytoken,usercontroller.getAllUser)


router.route('/register')
    .post(upload.single('avatar'),usercontroller.register)

router.route('/login')
    .post(usercontroller.login)
module.exports = router;
