import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import WaypointElement from '../waypointElement';
import './styles.css';

function WaypointList() {
  const waypoints = useSelector((state) => state.uav.waypoints);

  useEffect(() => {
    // Lógica adicional al actualizar los waypoints (si es necesario)
    // Esta función se ejecutará cada vez que cambien los waypoints
  }, [waypoints]);

  return (
    <div className="">
      {waypoints.length > 0 ? (
        <div className="waypointsContainer">
          {waypoints.map((waypoint, index) => (
            <WaypointElement key={index} waypoint={waypoint} index={index} />
          ))}
        </div>
      ) : (
        <p className="notWaypoints">No hay waypoints</p>
      )}
    </div>
  );
}

export default WaypointList;
