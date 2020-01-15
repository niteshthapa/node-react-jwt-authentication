const router = require('express').Router();
const auth = require('../middelware/authCheck');
// Route    GET api/dashboard
// Desc     Logged in user info
// Access   Private
//----------------------
router.get('/',auth,async(req,res)=>{
 try {
    res.status(200).json({success: true,message: ' Dasbhoard data'});
 } catch (error) {
    return res.status(500).json({ success: false,msg: "Server error" });
 }
   
     
    
})
module.exports = router;