import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import campersReducer from "./campers/campers.slice";
import filtersReducer from "./filters/filters.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["filters"], // Персистимо тільки фільтри
};

const persistedFiltersReducer = persistReducer(persistConfig, filtersReducer);

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: persistedFiltersReducer,
  },
});

export const persistor = persistStore(store);
