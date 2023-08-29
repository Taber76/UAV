import { createSlice } from '@reduxjs/toolkit';

const uavSlice = createSlice({
  name: 'uav',
  initialState: { 
    uavname: 'Unselected',
    connected: false,
    status: 'Offline',
    url: null,
    position: { lat: -32.7983559, lon: -55.9612037, alt: 0, relative_alt: 0 },
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
    connected: (state, action) => {
      state.uavname = action.payload.uavName;
      state.connected = true;
      state.status = action.payload.status;
      state.url = action.payload.url;
      state.position = action.payload.position;
      state.speed = action.payload.speed;
      state.battery = action.payload.battery;
      state.waypoints = action.payload.waypoints;
     },
    arm: (state) => {
      state.status = 'Armed';
    },
    disconnect: (state) => {
      state.uavname = 'Unselected';
      state.status = 'Offline';
      state.connected = false;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
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

export const { select, connecting, connected, arm, disconnect, setUrl, setPosition, setSpeed, setBattery, addWaypoint, removeWaypoint } = uavSlice.actions;
export default uavSlice.reducer;
