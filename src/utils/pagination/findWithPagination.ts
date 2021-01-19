export const find = async (model: any, filters: any, limit: any, sort: any, skip: any): Promise<any> => (
  await model.find(filters)
  .limit(limit)
  .sort(sort)
  .skip(skip)
);