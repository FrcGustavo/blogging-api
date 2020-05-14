const index = async (req, res, next) => {
  const { user } = req.query;
  try {
    if (user) return res.render('pages/home');
    return res.redirect('/signup');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  index,
};
