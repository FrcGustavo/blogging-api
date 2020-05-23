/**
 * the format for responses unsuccessfully
 * @param {import("express").Response} res
 * @param {String} message
 * @param {any} data
 * @param {Number} status
 */
const success = (res, message = 'Your request is unsuccess', data = false, status = 400) => {
  res
    .status(status)
    .json({
      error: true,
      status,
      message,
      body: data,
    });
};

module.exports = success;
