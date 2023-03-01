/* eslint-disable import/no-cycle */
import { watchSaga } from './watchSaga';

export default function* rootSaga() {
  // eslint-disable-next-line no-console
  console.log('root saga');

  yield watchSaga();
}
