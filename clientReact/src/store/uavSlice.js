import { createSlice } from '@reduxjs/toolkit';

const uavSlice = createSlice({
  name: 'uav',
  initialState: { 
    uavname: 'No selected',
    connected: false,
    status: 'Offline',
    url: null,
    location: null,
    speed: null,
    battery: null,
    waypoints: [],
  },
  reducers: {
    select: (state, action) => {
      state.uavname = action.payload;
    },
    connecting: (state) => {
      state.status = 'Connecting...';
    },
    connected: (state) => {
      state.status = 'Disarmed';
      state.connected = true;
    },
    arm: (state) => {
      state.status = 'Armed';
    },
    disconnect: (state) => {
      state.name = 'No selected';
      state.status = 'Offline';
      state.connected = false;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setSpeed: (state, action) => {
      state.speed = action.payload;
    },
    setBattery: (state, action) => {
      state.battery = action.payload;
    },
    addWaypoint: (state, action) => {
      state.waypoints.push(action.payload);
    },
    removeWaypoint: (state, action) => {
      state.waypoints.splice(action.payload, 1);
    }
  },
});

export const { select, connecting, connected, arm, disconnect, setUrl, setLocation, setSpeed, setBattery, addWaypoint, removeWaypoint } = uavSlice.actions;
export default uavSlice.reducer;
