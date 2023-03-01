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
  totalSum: number;
  totalCount: number;
  showSuccess: boolean;
  statusPosting: 'idle' | 'posting' | 'failed';
  error: string | null;
}

const initialState: BasketState = {
  storage: [],
  totalSum: 0,
  totalCount: 0,
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
      state.totalSum = Math.ceil(
        state.storage.reduce((accumulator, elem) => accumulator
        + Number(elem.product.price) * elem.countOrdered, 0) * 100,
      ) / 100;

      state.totalCount = state.storage.reduce((accumulator, elem) => accumulator
        + elem.countOrdered, 0);
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
        state.totalSum = Math.ceil(
          state.storage.reduce((accumulator, elem) => accumulator
          + Number(elem.product.price) * elem.countOrdered, 0) * 100,
        ) / 100;

        state.totalCount = state.storage.reduce(
          (accumulator, elem) => accumulator + elem.countOrdered,
          0,
        );
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
        state.totalSum = Math.ceil(
          state.storage.reduce((accumulator, elem) => accumulator
          + Number(elem.product.price) * elem.countOrdered, 0) * 100,
        ) / 100;

        state.totalCount = state.storage.reduce(
          (accumulator, elem) => accumulator + elem.countOrdered,
          0,
        );
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
export const selectTotalSum = (state: RootState) => state.basket.totalSum;
export const selectTotalCount = (state: RootState) => state.basket.totalCount;
export const selectShowSusses = (state: RootState) => state.basket.showSuccess;
export const selectStatusPosting
= (state: RootState) => state.basket.statusPosting;
export const selectBasketError
= (state: RootState) => state.basket.error;
