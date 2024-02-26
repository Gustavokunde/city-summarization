import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_PARAMS_API,
});

export interface Params {
  _id: string | null;
  countryCode: string;
  numberOfCityOptions: number;
  cityDetails: string[];
  geodbURL: string;
}
