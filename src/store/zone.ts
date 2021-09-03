import { createSlice,PayloadAction} from "@reduxjs/toolkit";
import { Realty } from "../types/Realty";

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
        },
        setLike:(state,action:PayloadAction<any>)=>{
            const {like, realty_id} = action.payload;
            const index= state.zone_list.findIndex((item : Realty)=>item.realty_id===realty_id);
            state.zone_list[index].isLiked = like;
            console.log('like' ,like);
            // console.log(index);
            // console.log(state.zone_list[0].isLiked);
        }
    }
})

export const {setZone,setLike}  = zoneSlice.actions;
export default zoneSlice.reducer;