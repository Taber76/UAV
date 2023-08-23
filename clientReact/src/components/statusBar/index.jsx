import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import DropdownButton from "../dropdownButton";
import StatusDisplay from "../statusDisplay";
import './styles.css';

import { connected, disconnect } from "../../store/uavSlice";
import { getStatus } from "../../services/uavService";
const apiUrl = import.meta.env.VITE_API_URL

const StatusBar = () => {
  const [signal, setSignal] = useState('disabled');
  const [uavList, setUavList] = useState({});

  const dispatch = useDispatch();
  const uavConnected = useSelector((state) => state.uav.connected);
  const selectedUAV = useSelector((state) => state.uav.uavname);
  const status = useSelector((state) => state.uav.status);

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
      if (uavConnected) {
        const response = await getStatus(selectedUAV);
        return response;
      }   
      return
    }
    const interval = setInterval(fetchUavStatus, 2000) 
      return () => {
      clearInterval(interval)
    }
  }, [uavConnected]);
  

  return (
    <div className="statusBar">
      <div></div>
      <div></div>
      <div>
        <DropdownButton buttonText={selectedUAV} options={Object.keys(uavList).map(key => ({ label: key }))} onSelect={handleSelect} />
        <StatusDisplay text={status} status={signal} />
      </div>
    </div>
  )
}

export default StatusBar