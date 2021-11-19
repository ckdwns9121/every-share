//유저 스토어
import { createAction, createReducer } from 'typesafe-actions';
import { IUser } from '../types/User';

const GET_USER = 'user/GET_USER';
const LOGOUT = 'user/LOGOUT';
const UPDATE = 'user/UPDATE';

type UPDATE_KIND = 'name' | 'password' | 'phone_number';

export const getUser = createAction(GET_USER)<any>();
export const logout = createAction(LOGOUT)();
export const update =
  createAction(UPDATE)<{ name: UPDATE_KIND; value: string }>();

type Actions =
  | ReturnType<typeof getUser>
  | ReturnType<typeof logout>
  | ReturnType<typeof update>;

const initState: IUser = {
  user: null,
};

const userStore = createReducer<IUser, Actions>(initState, {
  [GET_USER]: (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  },
  [UPDATE]: (state, action) => {
    const { user } = state;
    const { name, value } = action.payload;
    if (user) {
      if (name === 'name' || name === 'password' || name === 'phone_number') {
        user[name] = value;
      }
    }
    return {
      ...state,
      user: user,
    };
  },
  [LOGOUT]: (state, action) => {
    return {
      ...state,
      user: null,
    };
  },
});

export type RootState = ReturnType<typeof userStore>;
export default userStore;
