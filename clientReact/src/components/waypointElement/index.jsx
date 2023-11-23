import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

import { removeWaypoint } from "../../store/uavSlice";

function WaypointElement({ waypoint, index }) {
  const dispatch = useDispatch();


  const handleRemove = () => {
    dispatch(removeWaypoint({ index }));
  }

  return (
    <div className="waypointContainer">

      {index === 0 ?
        <div className="waypointInfo">
          <p>Recorrido total: <b>{waypoint.dist.toFixed(2)}Km</b></p>
        </div>
        :
        <div className="waypointInfo">
          <p>Tramo {index} -{'>'} {waypoint.dist.toFixed(2)}Km</p>
          <p>Alt: {waypoint.alt}m</p>
          <div className="deleteIcon" onClick={handleRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      }

    </div>
  );
}

export default WaypointElement;
