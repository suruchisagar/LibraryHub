
const jwt= require('jsonwebtoken');
//client management
const requireSuperAdmin = (req, res, next) => {
  if (req.user?.role_id !== 2) {
    console.log(req.user.role_id);
    return res.status(403).json({ message: "Forbidden: Super admin only" });
  }
  next();
};

const authenticate = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.json({
            message: "Please provide the token"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user=decoded;
    next();
};

// Require role >= admin (role_id = 1 or 2)
const requireAdmin = (req, res, next) => {
  if (req.user?.role_id !== 1 ) {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

module.exports = {
  authenticate,
  requireSuperAdmin,
  requireAdmin
};