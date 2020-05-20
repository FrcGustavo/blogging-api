/**
 * the format for responses successfully
 * @param {import("express").Response} res
 * @param {String} message
 * @param {any} data
 * @param {Number} status
 */
const success = (res, message = 'Your request is success', data = false, status = 200) => {
  res
    .status(status)
    .json({
      error: false,
      status,
      message,
      body: data,
    });
};

module.exports = success;
