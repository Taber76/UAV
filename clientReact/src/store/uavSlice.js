import { createSlice } from '@reduxjs/toolkit';

const uavSlice = createSlice({
  name: 'uav',
  initialState: { 
    uavname: 'Unselected',
    connected: false,
    status: 'Offline',
    url: null,
    position: { lat: -32.7983559, lon: -55.9612037, alt: 0, relative_alt: 0, hdg: 0 },
    roll: 0, // balanceo
    pitch: 0, // cabeceo
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
      state.position = {
         lat: action.payload.position.lat / 10000000,
         lon: action.payload.position.lon / 10000000,
         alt: action.payload.position.alt,
         relative_alt: action.payload.position.relative_alt,
         hdg: action.payload.position.hdg / 100
        };
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
      state.position = {
        lat: action.payload.lat / 10000000,
        lon: action.payload.lon / 10000000,
        alt: action.payload.alt,
        relative_alt: action.payload.relative_alt,
        hdg: action.payload.hdg / 100
       };
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
