const { body } = require("express-validator");

const ValidationResult = (req,res,next) => {
    return [
        req.body('title')
            .notEmpty()
            .withMessage("title is vide")
            .isLength({min:2})
            .withMessage("at least 2 char"),
        req.body('price')
            .notEmpty()
            .withMessage("the price important!!"),
        req.body('livresion') 
            .notEmpty()
            .withMessage("is the livresion avaible ??")
    ];
};


module.exporte = {
    ValidationResult
}