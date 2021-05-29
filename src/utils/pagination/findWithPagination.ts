export const find = async (
  model: any,
  filters: any,
  limit: any,
  sort: any,
  skip: any
): Promise<any> => {
  const findedData = await model
    .find(filters)
    .limit(limit)
    .sort(sort)
    .skip(skip);
  return findedData;
};
