import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRealty } from '../types/Realty';

export interface State {
  zone_list: IRealty[];
}

const initialState: State = {
  zone_list: [],
};

const zoneSlice = createSlice({
  name: 'zone',
  initialState,
  reducers: {
    setZone: (state, action: PayloadAction<IRealty[]>) => {
      console.log(action);
      state.zone_list = action.payload;
    },
    setLike: (state, action: PayloadAction<any>) => {
      const { like, realty_id } = action.payload;
      const index = state.zone_list.findIndex(
        (item: IRealty) => item.realty_id === realty_id
      );
      if (index !== -1) {
        state.zone_list[index].isLiked = like;
      }
    },
  },
});

export const { setZone, setLike } = zoneSlice.actions;
export default zoneSlice.reducer;
