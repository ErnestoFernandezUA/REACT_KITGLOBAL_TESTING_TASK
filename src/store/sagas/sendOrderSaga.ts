/* eslint-disable import/no-cycle */
import { put, delay, select } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  BasketPosition,
  setError,
  setShowSuccess,
  setStatusPosting,
} from '../features/Basket/basketSlice';
import { RootState } from '..';

export function* sendOrderSaga(): Generator<unknown, void, BasketPosition[]> {
  // eslint-disable-next-line no-console
  console.log('sendOrderSaga');

  // set loader status 'true'
  yield put(setStatusPosting('posting'));

  try {
    yield delay(5000); // it's sagas effect for delay

    // show order in console not prepared object
    const basket = yield select((state: RootState) => state.basket.storage);

    // eslint-disable-next-line no-console
    console.log('Your order is:');
    basket.forEach((e: BasketPosition) => {
      // eslint-disable-next-line no-console
      console.log(e.product.title, e.countOrdered);
    });

    const total = yield select((state: RootState) => state.basket.totalSum);

    // eslint-disable-next-line no-console
    console.log('Your total sum is:', total);

    // there should to axios post with token + prepared data of basket
    yield put(setShowSuccess(true)); // it's emulate response from server
  } catch (error: unknown) {
    yield put(setError((error as AxiosError).message));
  } finally {
    yield put(setStatusPosting('idle'));
  }
}
