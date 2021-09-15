import { createSlice,PayloadAction } from "@reduxjs/toolkit";


export interface IDialog{
    open: boolean,
    title:string,
    message : string,
    isConfirm: boolean,
    onClick: ()=>void | Promise<void>
    onClose: ()=>void
}
const initialState={
    open: false,
    title:'',
    message : '',
    isConfirm: false,
    onClick: ()=>{},
    onClose: ()=>{}
} as IDialog


const dialogSlice = createSlice({
    name:'dialog',
    initialState,
    reducers:{
        onDialog:(state,action:PayloadAction<IDialog>)=>{
            const {title,message,isConfirm,onClick,onClose}= action.payload;
            state.open=true;
            state.title=title;
            state.message=message;
            state.isConfirm=isConfirm;
            state.onClick=onClick;
            state.onClose=onClose;
        },
        offDialog:(state)=>{
            state.open=false;
        }
    }
})

export const {onDialog,offDialog} = dialogSlice.actions;
export default dialogSlice.reducer;