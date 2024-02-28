const express = require("express");
const router = express.Router();
const controle = require("../controller/product.controller");
const virefytoken = require("../middleware/virefytoken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/Roles");




router.route('/')
    .get(controle.getAllproduct) 
    .post(virefytoken,controle.createproduct);
    

router.route('/:productid')
    .get(controle.getoneproduct)
    .patch(virefytoken,controle.updateproduct)
    .delete(virefytoken,allowedTo(userRoles.ADMIN,userRoles.SUPER_ADMIN),controle.deleteproduct);

module.exports = router;
