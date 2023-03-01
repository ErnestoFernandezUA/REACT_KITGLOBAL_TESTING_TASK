/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../..';
import { Product } from '../../../type/Product';

type BasketPosition = {
  product: Product;
  countOrdered: number;
};

export interface BasketState {
  storage: BasketPosition[];
  total: number;
}

const initialState: BasketState = {
  storage: [],
  total: 0,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProductToBasket: (
      state: BasketState,
      action: PayloadAction<{ product: Product; count: number }>,
    ) => {
      const { count, product } = action.payload;

      const productIndexInBasket = state.storage
        .findIndex(bp => bp.product.id === product.id);

      if (productIndexInBasket >= 0) {
        state.storage[productIndexInBasket].countOrdered += count;
      } else {
        state.storage.push({
          product,
          countOrdered: count,
        });
      }

      state.total = Math.ceil(
        state.storage.reduce((accumulator, elem) => accumulator
        + Number(elem.product.price) * elem.countOrdered, 0) * 100,
      ) / 100;
    },
    removeProductFromBasket: (
      state: BasketState,
      action: PayloadAction<{ product: Product; count: number }>,
    ) => {
      const { count, product } = action.payload;

      const productIndexInBasket = state.storage
        .findIndex(bp => bp.product.id === product.id);

      if (productIndexInBasket >= 0
        && state.storage[productIndexInBasket].countOrdered >= count) {
        state.storage[productIndexInBasket].countOrdered -= count;

        state.total = Math.ceil(
          state.storage.reduce((accumulator, elem) => accumulator
          + Number(elem.product.price) * elem.countOrdered, 0) * 100,
        ) / 100;
      }
    },
    deleteProductInBasket: (
      state: BasketState,
      action: PayloadAction<{ product: Product }>,
    ) => {
      const { product } = action.payload;

      const productIndexInBasket = state.storage
        .findIndex(bp => bp.product.id === product.id);

      if (productIndexInBasket >= 0) {
        state.storage.splice(productIndexInBasket, 1);

        state.total = Math.ceil(
          state.storage.reduce((accumulator, elem) => accumulator
          + Number(elem.product.price) * elem.countOrdered, 0) * 100,
        ) / 100;
      }
    },
    clearBasket: () => {
      return initialState;
    },
  },
});

export default basketSlice.reducer;
export const {
  addProductToBasket,
  removeProductFromBasket,
  deleteProductInBasket,
  clearBasket,
} = basketSlice.actions;

export const selectBasket = (state: RootState) => state.basket.storage;
export const selectTotal = (state: RootState) => state.basket.total;
