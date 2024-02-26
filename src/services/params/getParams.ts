import { api } from ".";

export const getParams = async () => {
  return await api.get("/params");
};
