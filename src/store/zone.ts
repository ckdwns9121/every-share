import { createSlice,PayloadAction} from "@reduxjs/toolkit";

export interface State{
    zone_list: any;
}

const initialState ={
    zone_list:[]
} as State

const zoneSlice = createSlice({
    name:'zone',
    initialState ,
    reducers:{
        setZone:(state,action:PayloadAction<any>)=>{
            state.zone_list = action.payload
        }
    }
})

export const {setZone}  = zoneSlice.actions;
export default zoneSlice.reducer;