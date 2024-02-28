const Usersdb = require("../model/user.model")
const httpStatusText = require("../utils/httpStatusText")
const bcrypt = require('bcrypt');
const generatetoken = require("../utils/generatetoken");
const asyncWrapper = require("../middleware/asyncWrapper");
const virefytoken = require("../middleware/virefytoken")


const getAllUser = asyncWrapper(async (req, res)=> {
    console.log('Fetching products...');
    const products = await Usersdb.find();
    res.json(products);
})

const register = asyncWrapper(async (req, res,next) => {
        
    const { username, email, password ,role} = req.body;
            if (username==="" || email==="" || password==="") {
                return res.status(400).json({ error: 'Username, email, and password are required' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new Usersdb({
                username: username,
                email: email,
                password: hashedPassword,
                role: role,
                avatar : req.file.filename
            }); 
            const existingEmail = await Usersdb.findOne({ email: req.body.email });
            const existingUsername = await Usersdb.findOne({ username: req.body.username });
            if(existingEmail || existingUsername){
                throw new Error('E-mail or Username already exists');
            }
            const token = await generatetoken({ email: newUser.email , id: newUser._id,role : newUser.role })
            newUser.token = token;
            await newUser.save();
            console.log("on a bien creé");
            res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
    })


const login = asyncWrapper(async(req,res)=>{

    const { email , password } = req.body;
    const user = await Usersdb.findOne({email : email});
    if(!user){
        res.status(404).json({
            status:"error",
            msg : "user not found"
        })
    }
    const ComparingPassword = await bcrypt.compare(password , user.password);
    if(user && ComparingPassword){

        const token = await generatetoken({email: user.email , id: user._id,role : user.role})
        res.status(200).json({status: httpStatusText.SUCCESS, data : {token}})
    }
    else{
        res.status(404).json({
            status:httpStatusText.ERROR,
            msg : "error password"
        })
    }
})

module.exports = {
    getAllUser,
    login,
    register
}