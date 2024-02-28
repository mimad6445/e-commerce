const productdb = require("../model/model");
const { validationResult } = require("express-validator");
const asyncWrapper = require("../middleware/asyncWrapper")
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/AppError");

const getAllproduct = asyncWrapper(async (req, res,next) =>{
    console.log('Fetching products...');
        const products = await productdb.find();
        res.json({status : httpStatusText.SUCCESS , data : {products}});
})
const getoneproduct = asyncWrapper(async(req, res) => {
    const one = await productdb.findById(req.params.productid);
    if (!one) {
        const error = new Error;
        error.message = "cannot found elm --wrong id";
        error.statusCode = 404;
        return next(error);
    }
    res.status(201).json( {status : httpStatusText.SUCCESS , data : {one}})
})
const createproduct = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    console.log("errors", errors);
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        // Assuming AppError.create creates an error object with appropriate details
        const errorObject = AppError.create(errorMessages, 400, httpStatusText.FAIL);
        return next(errorObject);
    }

    console.log(req.body);
    const addnew = new productdb(req.body);
        await addnew.save();
        res.status(201).json({
            status: httpStatusText.SUCCESS,
            data: { addnew }
        });
    
})
const updateproduct = asyncWrapper(async(req, res) => {
    const filter = { "_id": req.params.productid };
    const update = await productdb.updateOne(filter, req.body);
    if (!update) {
        const error = new Error;
        error.message = "cannot found elm --wrong id";
        error.statusCode = 404;
        return next(error);
    }
    res.status(201).json({status : httpStatusText.SUCCESS , data : {update}});
})
const deleteproduct = asyncWrapper(async(req, res) => {
    const deleting = await productdb.deleteOne({ _id: req.params.productid });
    if (!deleting) {
        return res.status(400).json({status : httpStatusText.FAIL , msg : "cannot found data"});
    }
    res.json({ status : httpStatusText.SUCCESS, data : null});
})
module.exports = {  
        getAllproduct, 
        getoneproduct,
        updateproduct,
        deleteproduct,
        createproduct
}