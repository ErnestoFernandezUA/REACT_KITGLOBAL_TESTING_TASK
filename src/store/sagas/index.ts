import { AxiosError } from 'axios';
import { put, takeLeading, delay } from 'redux-saga/effects';
import { getAllProducts } from '../../api/products';
import { Product } from '../../type/Product';
// eslint-disable-next-line import/no-cycle
import {
  loadProducts,
  setError, setProducts, setStatus,
} from '../features/Products/productsSlice';

function* workerSaga() {
  // eslint-disable-next-line no-console
  console.log('workerSaga');
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

function* watchSaga() {
  // eslint-disable-next-line no-console
  console.log('watchSaga');

  yield takeLeading(loadProducts().type, workerSaga);
}

export default function* root() {
  // eslint-disable-next-line no-console
  console.log('root saga');

  yield watchSaga();
}
