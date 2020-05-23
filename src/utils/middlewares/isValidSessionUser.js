const isValidSessionUser = (url) => (req, res, next) => {
  if (!req.session.user) res.redirect(url);
  else next();
};

module.exports = isValidSessionUser;
