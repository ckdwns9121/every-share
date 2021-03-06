// 매물 리스트
import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import { requestGetRealties } from '../api/realty';

const GET_LIST = 'realties/GET_LIST' as const;
const GET_LIST_SUCCESS = 'realties/GET_LIST_SUCCESS' as const;
const GET_LIST_ERROR = 'realties/GET_LIST_ERROR' as const;

export const getRealties = createAction(GET_LIST)<any>();
export const getListSuccess = createAction(GET_LIST_SUCCESS)<any>();
export const getListError = createAction(GET_LIST_ERROR)<any>();

const actions = { getRealties, getListSuccess, getListError };

type Actions = ActionType<typeof actions>;

interface IState {
  realties: any;
  success: boolean;
  error: boolean;
}

const initState: IState = {
  realties: [],
  success: false,
  error: false,
};

function* getRealtiesSaga(action: any): Generator {
  try {
    const { lat, lng, filter, access_token } = action.payload;
    const res: any = yield requestGetRealties(lat, lng, filter, access_token);
    console.log(res);
    if (res?.data?.message === 'success') {
      yield put({
        type: GET_LIST_SUCCESS,
        payload: res.data.realties,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export function* realtiesSaga() {
  yield takeLatest(getRealties, getRealtiesSaga);
}

const realties = createReducer<IState, Actions>(initState, {
  [GET_LIST]: (state, action) => {
    return {
      ...state,
      success: false,
      error: false,
    };
  },
  [GET_LIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      success: true,
      realties: action.payload,
    };
  },
  [GET_LIST_ERROR]: (state, action) => {
    return {
      ...state,
      success: false,
      error: true,
    };
  },
});

export type RooteState = ReturnType<typeof realties>;
export default realties;
