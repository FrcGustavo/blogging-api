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

const register = (req, res, next) => {
  try {
    res.redirect('/?user=true');
  } catch (error) {
    next(error);
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
