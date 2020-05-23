/**
 * validate that necesary parameters existed
 * @param {Array} validParams
 * @param {Object} body
 */
const requireParams = (params, body) => {
  params.forEach((field) => {
    if (body[field] === null || body[field] === undefined) {
      throw new Error(`Field ${field} is required`, 400);
    }
  });

  return body;
};

module.exports = requireParams;
