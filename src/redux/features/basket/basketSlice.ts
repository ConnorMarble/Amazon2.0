/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "src/types/interface";
import type { RootState } from "../../rootReducer";

const initialState: ProductInterface[] = [];

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: initialState,
    total: 0,
  },
  reducers: {
    setBasket: (state, action: PayloadAction<ProductInterface[]>) => {
      state.items = action.payload;
    },
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action: PayloadAction<ProductInterface>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const newBasket = state.items;

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id} as it is not in the basket!`
        );
      }

      state.items = newBasket;
    },
  },
});

export const { setBasket, addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors
export const selectItems = (state: RootState): ProductInterface[] =>
  state.basket.items;

export const selectTotal = (state: RootState): number =>
  state.basket.items.reduce(
    (total: number, item: ProductInterface) => total + item.price,
    0
  );

export default basketSlice.reducer;
