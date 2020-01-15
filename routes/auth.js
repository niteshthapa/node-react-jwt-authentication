const router = require('express').Router();
const Employee = require('../models/Employee');
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../middelware/authCheck');
// Route    GET api/auth
// Desc     Logged in user info
// Access   Private
//----------------------
router.get('/', auth, async (req, res) => {
    try {
      const authUser = await Employee.findById(req.decoded.userid).select('-password');
      res.json({ authUser: authUser });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
//router.get('/',auth,async(req,res)=>{
    //const authUserId = res.decoded.userid;
    ////try {
        //const authUser = await Employee.findById(req.decoded.userid).select('-password')
        
        //console.log(authUser);
       //res.status(200).json({ authUser: authUser });
       //res.status(200).json({ authUser: authUser });
        //return res.status(200).json({ authUser: authUser });
       
        //console.log(data); //200
    //    return await Employee.findById(req.decoded.userid).select('-password')
    //     .then(authUser=>{
    //         return  res.status(200).json({ authUser });
    //     });
        //console.log(authUser.name)
        //return authUser;
        //return  res.status(200).json({ authUser: authUser });
        //return res.json(authUser.name)
        
    //}  catch (error) {
        //console.log("error outside")
       //res.status(500).send('Server Error');
    //}
//})

// Route    POST api/auth
// Desc     Logged in Register user
// Access   Public
//----------------------
router.post('/',
[
    check('email', 'Email is required.').not().isEmpty().isEmail().withMessage("Not a valid email")
    .custom(async (value) => {
      const user = await Employee.findOne({ 'email': value });
      if (user === null) {
        return Promise.reject('The Email does not exist.');
      }
     }),
  check('password', 'Password is required.').not().isEmpty()
  .custom(async (value,{req}) => {
    const user = await Employee.findOne({ 'email': req.body.email });
    if (user === null) {
        return Promise.reject('The username and password combination is not correct.');
    }
    const result  = await bcrypt.compareSync(value, user.password);
    if (!result === true) {
        return Promise.reject('The password is invalid.');
      }
})
  ],
async(req,res)=>{
    //Catch all erros in result
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // Response will contain something like
        // { errors: [ "body[password]: must be at least 10 chars long" ] }
        return  res.status(400).json({ error: result.mapped() });
      }

    //const errors = validationResult(req);
    //console.log(errors)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ error: errors.mapped() });
    // }
    //If no errors in form then run below code
       try {
       // console.log(password)
        //const verifyPassword = await Employee.findOne({password: req.body.password});
        //console.log(verifyEmail._id)
   
//if(!verifyUser)return res.status(400).json({success: false, msg: "User does not exists" });
//const result  = await bcrypt.compareSync(password, verifyPassword.password);
//var passwordMistach = {param: "password", msg: "Wrong Password", value: req.body.password};

//if(result === true){
    //console.log("success")
     const userId = await Employee.findOne({ 'email': req.body.email });
    //console.log(userId)
    const payload = { userid: userId._id };
     const options = { expiresIn: '2d' };
     const token = jwt.sign(payload, config.get('jwtSecretKey'), options);
     return res.status(200).json({success: true, msg: "Password ok",token:token });
 //}
 //else{
     //console.log(passwordMistach)
    //errors.push(passwordMistach);
    //return res.status(400).json({success: false, msg: "Wrong Password" });
 //}        
       
           
    } catch (error) {
        return res.status(500).json({ success: false,msg: "Server error" });
    }
})
module.exports = router;