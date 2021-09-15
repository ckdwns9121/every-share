//맵 관련 스토어

import {createAction, ActionType, createReducer, createAsyncAction} from 'typesafe-actions';
import { takeEvery, call, put, delay,takeLatest } from 'redux-saga/effects';

const SET_LEVEL ='map/SET_LEVEL' as const;
const SET_POSITION ='map/SET_POSITION' as const;
const SET_AREA ='map/SET_AREA' as const;


export const setLevel = createAction(SET_LEVEL)<number>();
export const setPosition = createAction(SET_POSITION)<any>();
export const setArea = createAction(SET_AREA)<any>();


const actions={setLevel,setPosition,setArea}

type Actions = ActionType<typeof actions>;

interface Response {
    data : any
}
interface IState{
    level: number,
    position:{
        lat : number,
        lng : number,
    },
    address : string | null,
    area: object,
}

const initState : IState ={
    level : 5,
    position :{ lat:0,lng:0},
    address: null,
    area : {},
}

function *getAreaSaga(action: any) : Generator{
    try{

    }
    catch(e){

    }
}

export function* mapSaga(){
    yield takeLatest(SET_AREA, getAreaSaga);
}


const map = createReducer<IState,Actions>(initState ,{
    [SET_LEVEL]: (state, action) =>
    {
        return {
            ...state,
            level : action.payload
        }
    },
    [SET_POSITION]: (state, action) =>
    {
        return {
            ...state,
            position : action.payload
        }
    },
    [SET_AREA] : (state,action) =>{
        return{
            ...state,
            area: action.payload
        }
    }
})

export type RooteState = ReturnType<typeof map>;
export default map;