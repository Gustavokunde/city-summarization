import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface CitiesState {
  cities: Array<CityDetails>;
}

const initialState: CitiesState = { cities: [] };

export interface CityDetails {
  description: string;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  male_population_amount: number;
  female_population_amount: number;
  top_attractions: Array<string>;
  climate: string;
  cuisine: string;
  culture_history: string;
  transportation: string;
  safety: string;
  local_tips: Array<string>;
}

const cityReducer = (
  state = initialState,
  action: { type: string; payload: Array<CityDetails> }
) => {
  switch (action.type) {
    case "ADD_CITIES":
      return { cities: action.payload };
    default:
      return state;
  }
};

export const addCities = (cities: Array<CityDetails>) => ({
  type: "ADD_CITIES",
  payload: cities,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cityReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
