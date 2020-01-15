var jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function(req, res, next) {

    let token = req.headers['x-auth-token']; 
    if (!token) {
      console.log("Auth token is not supplied")
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
      
      const decoded = jwt.verify(token, config.get('jwtSecretKey'));
      req.decoded = decoded;
      //console.log("token is valid")
            next();
   
    } catch (error) {
      console.log("Token is not valid")
      res.status(401).json({success: false,message: 'Token is not valid'});
    }
   
};
