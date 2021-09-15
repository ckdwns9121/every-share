import { createSlice,PayloadAction } from "@reduxjs/toolkit";


export interface Snackbar{
    open: boolean,
    up: boolean,
    message : string,
    variant: string,
}
const initialState={
    open:false,
    up:false,
    message:'',
    variant:'default',
} as Snackbar


const snackbarSlice = createSlice({
    name:'snackbar',
    initialState,
    reducers:{
        onSnackbar:(state,action:PayloadAction<Snackbar>)=>{
            state.open= true;
            state.up= action.payload.up;
            state.message=action.payload.message;
            state.variant = action.payload.variant;
        },
        offSnackbar:(state)=>{
            state.open=false;
        }
    }
})

export const {onSnackbar,offSnackbar} = snackbarSlice.actions;
export default snackbarSlice.reducer;