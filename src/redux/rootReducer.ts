import { combineReducers } from "@reduxjs/toolkit";
import basketReducer from "./features/basket/basketSlice";

export const rootReducer = combineReducers({ basket: basketReducer });
export type RootState = ReturnType<typeof rootReducer>;
