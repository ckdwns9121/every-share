// 매물 리스트

//맵 관련 스토어

import {createAction, ActionType, createReducer, createAsyncAction} from 'typesafe-actions';
import { takeEvery, call, put, delay,takeLatest } from 'redux-saga/effects';
import {requestGetRealties} from '../api/realty';

const GET_LIST ='realties/GET_LIST' as const;
const GET_LIST_SUCCESS ='realties/GET_LIST_SUCCESS' as const;
const GET_LIST_ERROR ='realties/GET_LIST_ERROR' as const;


export const getList = createAction(GET_LIST)<any>();
export const getListSuccess = createAction(GET_LIST_SUCCESS)<any>();
export const getListError = createAction(GET_LIST_ERROR)<any>();



const actions={getList,getListSuccess,getListError}

type Actions = ActionType<typeof actions>;

interface Response {
    data : object
}

interface State{
    realties : any;
    success : boolean,
    error: boolean,
}

const initState : State ={
    realties : [],
    success : false,
    error: false,
}




function *getRealtiesSaga(action: any) : Generator{
    try{   
        const {lat,lng,filter} = action.payload
        const res :any = yield requestGetRealties(lat,lng,filter);
        console.log(res);
        if(res?.data?.message==='success'){
            yield put({
                type: GET_LIST_SUCCESS,
                payload: res.data.realties
            })
        }

    }
    catch(e){

    }
}

export function* realtiesSaga(){
    yield takeLatest(getList, getRealtiesSaga);
}


const realties = createReducer<State,Actions>(initState ,{
    [GET_LIST]: (state, action) =>
    {
        return {
            ...state,
            success:false,
            error:false
        }
    },
    [GET_LIST_SUCCESS]: (state, action) =>
    {
        return {
            ...state,
            success:true,
            realties :action.payload
        }
    },
    [GET_LIST_ERROR] : (state, action) =>{
        return{
            ...state,
            success:false,
            error:true
        }
    }

})

export type RooteState = ReturnType<typeof realties>;
export default realties;