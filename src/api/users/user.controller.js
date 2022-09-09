const passport = require('passport');
const User = require('./user.model');

const registerPost = (req, res) => {
  
  const done = (error, user) => {
    if (error) return res.status(500).json(error.message);

    req.logIn(user, (error) => {
      if (error) return res.status(error.status || 500).json(error.message);
      return res.status(201).json(user);
    });
  }
  
  passport.authenticate('register', done)(req);
};
//_____________________________________________________________
const putUser = async (req, res, next) => {

  try{
    const id = req.params.id;
    const user = new User(req.body);
    user._id = id;
    const updatedUser = await User.findByIdAndUpdate(id, user).populate('store');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  } 
}
//_______________________________________________________________
const checkSessionGet = (req, res, next) => {   
  if(req.user) {     req.user.password = null;     
    return res.status(200).json(req.user);   
  } else {     
    return res.status(200).json();   
  }  
}

const loginPost = (req, res) => {

  const done = (error, user) => {
    if (error) return res.status(error.status || 500).json(error.message);

    req.logIn(user, (error) => {
      if (error) return res.status(error.status || 500).json(error.message);
      return res.status(200).json(user);
    });
  };

  passport.authenticate('login', done)(req);
};

const logoutPost = async (req, res) => {
  if(req.user) {
    await req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        return res.status(200).json('Hasta pronto! Te has deslogueado correctamente');
      });
    });
  } else {
    return res.status(404).json('No hay usuario autenticado');
  }
};

const test = (req, res) => {
  console.log('Usuario autenticado', req.user);
  return res.status(200).json(req.user);
};

module.exports = {
  registerPost,
  putUser,
  loginPost,
  logoutPost,
  checkSessionGet,
  test,
}