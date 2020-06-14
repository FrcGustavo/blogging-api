const toDoPagination = async (model: any, query = { limit: 10, page: 1 }, filters = {}) => {
  const { limit, page } = query;
  const total = await model.countDocuments(filters);

  return {
    total,
    pages: Math.ceil(total / limit),
    page: page || 1,
  };
};

export default toDoPagination;
