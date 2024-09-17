const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if(!req.headers.authorization)
    return res.status(401).json({ message: 'No token' });

  if (!req.headers.authorization.startsWith('Bearer'))
    return res.status(401).json({ message: 'No Bearer token' });

    try {
      token = req.headers.authorization.split(' ')[1];
    } catch (error) {
      return res.status(401).json({ message: 'Cannot split token' });
    }

    let retMsg = "";
	
	try
	{ 
	  retMsg = "Token: " + token;
	  const decoded = jwt.verify(token, process.env.JWT_SECRET);
	  retMsg += " Decoded: " + decoded;
      req.user = await User.findById(decoded.id).select('-password');
	  retMsg += " User : " + req.user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed :: ' + error + " Details: " + retMsg});
    }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
