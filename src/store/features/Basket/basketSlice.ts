/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../..';
import { Product } from '../../../type/Product';

export type BasketPosition = {
  product: Product;
  countOrdered: number;
};

export interface BasketState {
  storage: BasketPosition[];
  total: number;
  showSuccess: boolean;
  statusPosting: 'idle' | 'posting' | 'failed';
  error: string | null;
}

const initialState: BasketState = {
  storage: [],
  total: 0,
  showSuccess: false,
  statusPosting: 'idle',
  error: null,
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

      // update total sum after all add operation
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

        // update total sum after each remove operation
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

        // update total sum after each delete operation
        state.total = Math.ceil(
          state.storage.reduce((accumulator, elem) => accumulator
          + Number(elem.product.price) * elem.countOrdered, 0) * 100,
        ) / 100;
      }
    },
    sendOrderToServer: () => {
      // add empty actions for saga watchers

      // eslint-disable-next-line no-console
      console.log('sendOrderToServer');
    },
    setShowSuccess: (state, action: PayloadAction<boolean>) => {
      state.showSuccess = action.payload;
    },
    setStatusPosting: (
      state: BasketState,
      action: PayloadAction<'idle' | 'posting' | 'failed'>,
    ) => {
      state.statusPosting = action.payload;
    },
    setError: (state: BasketState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.statusPosting = 'failed';
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
  sendOrderToServer,
  setShowSuccess,
  setStatusPosting,
  setError,
  clearBasket,
} = basketSlice.actions;

export const selectBasket = (state: RootState) => state.basket.storage;
export const selectTotal = (state: RootState) => state.basket.total;
export const selectShowSusses = (state: RootState) => state.basket.showSuccess;
export const selectStatusPosting
= (state: RootState) => state.basket.statusPosting;
