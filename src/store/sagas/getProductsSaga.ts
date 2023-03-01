/* eslint-disable import/no-cycle */
import { AxiosError } from 'axios';
import { put, delay } from 'redux-saga/effects';
import { getAllProducts } from '../../api/products';
import { Product } from '../../type/Product';
import {
  setError,
  setProducts,
  setStatus,
} from '../features/Products/productsSlice';

export function* getProductsSaga() {
  // eslint-disable-next-line no-console
  console.log('getProductsSaga');
  yield put(setStatus('loading'));

  try {
    yield delay(3000);
    const response: Product[] = yield getAllProducts();

    // eslint-disable-next-line no-console
    console.log(response);

    yield put(setProducts(response));
  } catch (error: unknown) {
    yield put(setError((error as AxiosError).message));
  } finally {
    yield put(setStatus('idle'));
  }
}
