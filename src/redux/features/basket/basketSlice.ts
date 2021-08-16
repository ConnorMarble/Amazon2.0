/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateInterface {
  name: string;
}

const initialState: InitialStateInterface[] = [];
const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: initialState,
  },
  reducers: {
    setBasket: (state, action: PayloadAction<InitialStateInterface[]>) => {
      state.basket = action.payload;
    },
  },
});

export const { setBasket } = basketSlice.actions;

export default basketSlice.reducer;
