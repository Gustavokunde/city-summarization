import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState: Array<string> = [];

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CITIES":
      return {
        ...state,
        cities: action.payload,
      };
    default:
      return state;
  }
};

export const addCities = (cities: object[]) => ({
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
