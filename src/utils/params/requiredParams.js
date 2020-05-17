/**
 * filter an object only with valid parameters
 * @param {Array} validParams
 * @param {Object} body
 */
const requiredParams = (params, body) => {
  params.forEach((field) => {
    if (body[field] === null || body[field] === undefined) {
      throw new Error(`Field ${field} is required`, 400);
    }
  });

  return body;
};

module.exports = requiredParams;
