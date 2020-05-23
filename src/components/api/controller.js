const service = require('./service');
const { error } = require('../../utils/debug');

/**
 * Render page home
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const index = async (req, res, next) => {
  try {
    res.render('pages/home');
  } catch (err) {
    error(err);
    next(err);
  }
};

/**
 * Render page to register
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const signup = async (req, res, next) => {
  try {
    res.render('pages/signup');
  } catch (err) {
    error(err.message);
    next(err);
  }
};

/**
 * Register a new user and render login
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
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

/**
 * Render page of login
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
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
