const service = require('./service');

const index = async (req, res, next) => {
  const { user } = req.query;
  try {
    if (user) return res.render('pages/home');
    return res.redirect('/signup');
  } catch (error) {
    return next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    res.render('pages/signup');
  } catch (error) {
    next(error);
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
  } catch (error) {
    res.render('pages/signup', {
      errors: [
        error.message,
      ],
    });
  }
};

const signin = async (req, res, next) => {
  try {
    res.render('pages/signin');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  signup,
  register,
  signin,
};
