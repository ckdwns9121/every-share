import {createReducer} from 'typesafe-actions';

const ON_LOADING = 'loading/ON_LOADING' as const;

export const onLoading =(type:boolean) =>({type:ON_LOADING,payload:type});

type State= {
    loading:boolean
}

type Actions = | ReturnType<typeof onLoading>;

const initState={
    loading:false,
}

const loading = createReducer<State, Actions>(initState, {
    [ON_LOADING]: (state, action) =>
    {
        return {
            ...state,
            loading:action.payload,
        }
    }
});

export type RooteState = ReturnType<typeof loading>;
export default loading;