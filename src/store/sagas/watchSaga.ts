/* eslint-disable import/no-cycle */
import { takeLeading, takeEvery } from 'redux-saga/effects';
import { sendOrderToServer } from '../features/Basket/basketSlice';
import { loadProducts } from '../features/Products/productsSlice';
import { getProductsSaga } from './getProductsSaga';
import { sendOrderSaga } from './sendOrderSaga';

export function* watchSaga() {
  // eslint-disable-next-line no-console
  console.log('watchSaga');

  // send only first response
  // but we can add pagination for each response
  yield takeLeading(loadProducts().type, getProductsSaga);

  // run sendOrder every time
  yield takeEvery(sendOrderToServer().type, sendOrderSaga);
}
