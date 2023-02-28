/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../..';
import { Product } from '../../../type/Product';
import { getAllProducts } from '../../../api/products';

export interface ProductsState {
  storage: Product[];
  statusLoading: 'idle' | 'loading' | 'failed';
  error: unknown;
}

const initialState: ProductsState = {
  storage: [],
  statusLoading: 'idle',
  error: null,
};

export const getProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response: Product[] = await getAllProducts();

    // eslint-disable-next-line no-console
    // console.log(response);

    return response;
  },
);

const productsSlice = createSlice({
  name: 'interval',
  initialState,
  reducers: {
    addProduct: (state: ProductsState, action: PayloadAction<Product[]>) => {
      state.storage.push(...action.payload);
    },
    setStatus: (
      state: ProductsState,
      action: PayloadAction<'idle' | 'loading' | 'failed'>,
    ) => {
      state.statusLoading = action.payload;
    },
    setError: (state: ProductsState, action: PayloadAction<unknown>) => {
      state.error = action.payload;
      state.statusLoading = 'failed';
    },
    resetState: (state: ProductsState) => {
      return { ...state, ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state: ProductsState) => {
        state.statusLoading = 'loading';
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.storage.push(...action.payload);
        state.statusLoading = 'idle';
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.statusLoading = 'failed';

        // eslint-disable-next-line no-console
        console.log(action);
      });
  },
});

export default productsSlice.reducer;
export const {
  addProduct,
  setStatus,
  setError,
  resetState,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.storage;
export const selectPostStatusLoading
= (state: RootState) => state.products.statusLoading;
export const selectPostError = (state: RootState) => state.products.error;
