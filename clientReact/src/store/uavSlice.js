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
      if (action.payload.waypoints.length === 0) {
        state.waypoints = [{ lat: action.payload.position.lat / 10000000, lon: action.payload.position.lon / 10000000, alt: 50, dist: 0 }];
      } else {
        state.waypoints = action.payload.waypoints;
      }

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
    setPitchAndRoll: (state, action) => {
      state.roll = (action.payload.roll * (180 / Math.PI)).toFixed(1);
      state.pitch = (action.payload.pitch * (180 / Math.PI)).toFixed(1);
    },
    setSpeed: (state, action) => {
      state.speed = action.payload;
    },
    setBattery: (state, action) => {
      state.battery = action.payload;
    },
    addWaypoint: (state, action) => {
      const prevWaypoint = state.waypoints[state.waypoints.length - 1];
      const distance = calculateDistance(prevWaypoint.lat, prevWaypoint.lon, action.payload[0], action.payload[1]);
      const newWaypoint = {
        lat: action.payload[0],
        lon: action.payload[1],
        alt: 50,
        dist: distance
      };
      const insertIndex = state.waypoints.length;

      state.waypoints.splice(insertIndex, 0, newWaypoint);
      state.waypoints[0].dist = calculateTotalDistance(state.waypoints);
    },

    removeWaypoint: (state, action) => {
      state.waypoints.splice(action.payload.index, 1);

      // Actualizar los waypoints restantes
      for (let i = action.payload.index; i < state.waypoints.length; i++) {
        const prevWaypoint = state.waypoints[i - 1];
        const distance = calculateDistance(
          prevWaypoint.lat,
          prevWaypoint.lon,
          state.waypoints[i].lat,
          state.waypoints[i].lon
        );
        state.waypoints[i].dist = distance;
      }
      state.waypoints[0].dist = calculateTotalDistance(state.waypoints);
    }
  },
});

export const { select, connecting, connected, arm, disconnect, setUrl, setPosition, setPitchAndRoll, setSpeed, setBattery, addWaypoint, removeWaypoint } = uavSlice.actions;
export default uavSlice.reducer;


// -------------- Funciones auxiliares ----------------

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en kilómetros
  return distance;
};

const calculateTotalDistance = (waypoints) => {
  let totalDistance = 0;
  for (let i = 1; i < waypoints.length; i++) {
    totalDistance += waypoints[i].dist;
  }
  const returnDistance = calculateDistance(waypoints[0].lat, waypoints[0].lon, waypoints[waypoints.length - 1].lat, waypoints[waypoints.length - 1].lon);
  totalDistance += returnDistance;
  return totalDistance;
}