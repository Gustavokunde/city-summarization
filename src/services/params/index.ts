import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3000" });

export interface Params {
  _id: string | null;
  countryCode: string;
  numberOfCityOptions: number;
  cityDetails: string[];
  geodbURL: string;
}
