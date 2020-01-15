const router = require('express').Router();
const Employee = require('../models/Employee');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Route    POST api/users
// Desc     Register a new user
// Access   Public
//----------------------
router.post('/',
[
    check('name','Name is required.').not().isEmpty(),
    check('email', 'Email is required.').not().isEmpty().isEmail().withMessage("Not a valid email")
    .custom(async value => {
      const emailCheck = await Employee.findOne({ 'email': value });
      if (emailCheck !== null) {
        return Promise.reject();
      }
  }).withMessage('Email is already in use.')
    ,    check('password','Password is required').not().isEmpty().isLength({ min: 5 }).withMessage("Password is required and min length should be 5")
],
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.mapped() });
    }
    const {name,email,password} = req.body;
    try {
        
        //const verifyEmail = await Employee.findOne({email});
        //console.log(employee)
        //if(verifyEmail){
            //console.log(verifyEmail)
            
            //return res.status(400).json({ success: false,msg: "User already exists" });
        //}
        //else{
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(password, salt);
            const myData = await new Employee(
                {
                    name,
                    email,
                    password:hash
                }
            );
            myData.save();
            return res.status(200).json({success: true, msg: "Successfully registered" });

        //}
        
    } catch(error) {
        //console.log(error)
        return res.status(500).json({success: false, msg: "Server error" });
    }
    
})
module.exports = router;