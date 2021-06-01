import {combineReducers} from 'redux';
import map,{mapSaga} from './map';

import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({map});

export function *rootSaga(){
    yield all([mapSaga()]);
}
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>