import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import DropdownButton from "../dropdownButton";
import StatusDisplay from "../statusDisplay";
import './styles.css';

import { connected, disconnect, setPosition } from "../../store/uavSlice";
import { getStatus, getPosition } from "../../services/uavService";
const apiUrl = import.meta.env.VITE_API_URL

const StatusBar = () => {
  const [signal, setSignal] = useState('disabled');
  const [uavList, setUavList] = useState({});

  const dispatch = useDispatch();
  const uav = useSelector((state) => state.uav);

  // Selecciono UAV
  const handleSelect = async (selected) => {
    if (selected === 'Unselected') {
      dispatch(disconnect());
      setSignal('disabled');
    } else {
      dispatch(connected(uavList[selected]));
      setSignal('enabled');
    }
  }

  // Obtengo lista de UAVs conectados al servidor
  useEffect(() => { 
    async function fetchUavList() {
      const response = await axios.get(`${apiUrl}/uav/list`)
      if (response.status === 200) {
        response.data.Unselected = {}
        setUavList(response.data)
      }
      return 
    }
    fetchUavList()
  }, [])

  // Obtengo estado de UAV cada 2000ms
  useEffect(() => {
    async function fetchUavStatus() {
      if (uav.connected) {
        /*
        const uavStatus = await getStatus(uav.uavname);
        if (uavStatus.valid) {
          
        }
        */
        const uavPostion = await getPosition(uav.uavname);
        if (uavPostion.valid) {
          dispatch(setPosition(uavPostion.data));
        }
        return;
      }   
      return
    }
    const interval = setInterval(fetchUavStatus, 2000) 
      return () => {
      clearInterval(interval)
    }
  }, [uav.connected]);
  

  return (
    <div className="statusBar">
      <div></div>
      <div></div>
      <div>
        <DropdownButton buttonText={uav.uavname} options={Object.keys(uavList).map(key => ({ label: key }))} onSelect={handleSelect} />
        <StatusDisplay text={uav.status} status={signal} />
      </div>
    </div>
  )
}

export default StatusBar