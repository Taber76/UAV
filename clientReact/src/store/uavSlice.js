import { createSlice } from '@reduxjs/toolkit';

const uavSlice = createSlice({
  name: 'uav',
  initialState: { 
    name: 'No selected',
    status: 'Offline'
  },
  reducers: {
    select: (state, action) => {
      state.name = action.payload;
    },
    connect: (state) => {
      state.status = 'Disarmed';
    },
    arm: (state) => {
      state.status = 'Armed';
    },
    disconnect: (state) => {
      state.name = 'No selected';
      state.status = 'Offline';
    }
  },
});

export const { select, connect } = uavSlice.actions;
export default uavSlice.reducer;
