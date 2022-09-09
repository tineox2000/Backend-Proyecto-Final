const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
  
    return res.status(401).json("No estás autorizado, debes hacer login");
  };
  
  module.exports = {
    isAuthenticated,
  }
  