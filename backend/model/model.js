const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
        Name :{
            type : String,
            required : true,
            uniq : true ,
        },
        price :{
            type : Number,
            required : true,
        },
        decription :{
            type : String,
            required : false,
        },
        promotion :{
            type : Number,
            required : false,
        },
        livresion :{
            type : Boolean,
            required : true,
        },
})

module.exports = mongoose.model("meuble",productSchema);

