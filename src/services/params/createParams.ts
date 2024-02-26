import { api, Params } from ".";

export const createParams = async (params: Params) => {
  const isNew = !params._id;
  console.log(isNew, params);
  return await api[isNew ? "post" : "put"]("/params", params);
};
