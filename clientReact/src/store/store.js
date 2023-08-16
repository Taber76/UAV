import { configureStore } from '@reduxjs/toolkit';
import uavReducer from './uavSlice'; 

const store = configureStore({
  reducer: {
    uav: uavReducer,
  },
});

export default store;

