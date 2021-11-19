import { combineReducers } from 'redux';
import map, { mapSaga } from './map';
import filters from './filter';
import realties, { realtiesSaga } from './realties';
import zone from './zone';
import snackbar from './snackbar';
import loading from './loading';
import dialog from './dialog';
import userStore from './user';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  map,
  filters,
  user: userStore,
  realties,
  loading,
  zone,
  snackbar,
  dialog,
});

export function* rootSaga() {
  yield all([mapSaga(), realtiesSaga()]);
}
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
