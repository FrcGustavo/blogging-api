const service = require('./service');
const { error } = require('../../utils/debug');

const index = async (req, res, next) => {
  try {
    res.render('pages/home');
  } catch (err) {
    error(err);
    next(err);
  }
};

const signup = async (req, res, next) => {
  try {
    res.render('pages/signup');
  } catch (err) {
    error(err.message);
    next(err);
  }
};

const register = async (req, res) => {
  const user = req.body;
  try {
    await service.create(user);
    res.render('pages/signin', {
      messages: [
        'user created successfully',
      ],
    });
  } catch (err) {
    error(err.message);
    res.render('pages/signup', {
      errors: [
        err.message,
      ],
    });
  }
};

const signin = async (req, res, next) => {
  try {
    res.render('pages/signin');
  } catch (err) {
    error(err.message);
    next(err);
  }
};


const login = async (req, res, next) => {
  const user = req.body;
  try {
    const token = await service.logged(user);
    req.session.user = token;
    res.redirect('/');
  } catch (err) {
    error(err.message);
    next(err);
  }
};


module.exports = {
  index,
  signup,
  register,
  signin,
  login,
};
