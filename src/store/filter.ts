//매물 필터링 스토어

import { createAction, ActionType, createReducer } from 'typesafe-actions';

const SET_FILTERS = 'filter/SET_FILTERS';

export const setFilter = createAction(SET_FILTERS)<Payload>();

const actions = { setFilter };

type Actions = ActionType<typeof actions>;

interface Payload {
  type: string;
  value: boolean;
}
export interface IFilter {
  oneroom: boolean;
  tworoom: boolean;
  op: boolean;
  duplex: boolean;
}
const initState: IFilter = {
  oneroom: true,
  tworoom: true,
  op: true,
  duplex: true,
};

const filters = createReducer<IFilter, Actions>(initState, {
  [SET_FILTERS]: (state, action) => {
    const { type, value } = action.payload;
    return {
      ...state,
      [type]: value,
    };
  },
});

export type RooteState = ReturnType<typeof filters>;
export default filters;
