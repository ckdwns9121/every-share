import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {Snackbar as State} from '../types/Snackbar';


const initialState={
    open:false,
    up:false,
    message:'',
    variant:'default',
} as State


const snackbarSlice = createSlice({
    name:'snackbar',
    initialState,
    reducers:{
        snackbar_open:(state,action:PayloadAction<State>)=>{
            state.open= true;
            state.up= action.payload.up;
            state.message=action.payload.message;
            state.variant = action.payload.variant;
        },
        snackbar_close:(state)=>{
            state.open=false;
        }
    }
})

export const {snackbar_open,snackbar_close} = snackbarSlice.actions;
export default snackbarSlice.reducer;