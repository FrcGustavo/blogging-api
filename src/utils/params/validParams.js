/**
 * filter an object only with valid parameters
 * @param {Array} validParams
 * @param {Object} body
 */
const validParams = (params, body) => {
  const newParams = {};

  params.forEach((attr) => {
    if (Object.prototype.hasOwnProperty.call(body, attr)) {
      newParams[attr] = body[attr];
    }
  });

  return newParams;
};

module.exports = validParams;
