const {body, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();

// token
const createToken = (user) =>{
    return jwt.sign({user},process.env.SECRET, {expiresIn: '10d'} )
}


// user validation
module.exports.registerValidations = [
    body("name").not().isEmpty().withMessage("Name is Required"),
    body("email").not().isEmpty().withMessage("Email is Required"),
    body("password").isLength({min: 6}).withMessage("Password must be 6 characters")
];

// Sign Up API
module.exports.register = async (req,res) => {
   const {name, email, password} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       return  res.status(400).json({errors: errors.array()})
    }
    try{
            // check if user does not exist already
        const checkUser = await User.findOne({email})
        if(checkUser){
            return res.status(400).json({errors: [{msg: "Email is already taken"}]})
        }
            // secure password by hash and bcrypt
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

    
       
        // Otherwise create user
        const user = await User.create({
            name,
            email,
            password: hash
        })
        const token = createToken(user);
        return res.status(200).json({msg: 'Account Created', token})

    } catch(error){
        return res.status(500).json({errors: error})
    }
}


// login validation
module.exports.loginValidations = [
    body("email").not().isEmpty().withMessage("Email is Required"),
    body("password").not().isEmpty().withMessage("Password must not be empty")
];

// Login API
module.exports.login = async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {email, password} = req.body;
        try {
            const user = await User.findOne({email});
            if(user){
                const passwordMatched = await bcrypt.compare(password, user.password);
                if(passwordMatched){
                    const token = createToken(user);
                    return res.status(200).json({msg: "Login Success", token})
                }else{
                    return res.status(401).json({errors: [{msg: "InCorrect Password"}]})
                }
            }else {
                return res.status(404).json({errors: [{msg: "User not found"}]})
            }
        }catch(error){
            return res.status(500).json({errors: error})
        }
}
