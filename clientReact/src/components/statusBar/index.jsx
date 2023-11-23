import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DropdownButton from "../dropdownButton";
import StatusDisplay from "../statusDisplay";
import './styles.css';

import { connected, disconnect, setPosition, setPitchAndRoll } from "../../store/uavSlice";
import { getUavInfo, getUavList } from "../../services/uavService";

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
      const response = await getUavList();
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
        const uavStatus = await getUavInfo(uav.uavname, 'status');
        if (uavStatus.valid) {
          
        }
        */
        const uavPichAndRoll = await getUavInfo(uav.uavname, 'ATTITUDE');
        if (uavPichAndRoll.valid) {
          dispatch(setPitchAndRoll(uavPichAndRoll.data.message));
        }
        const uavPostion = await getUavInfo(uav.uavname, 'position');
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
        <DropdownButton
          buttonText={uav.uavname}
          options={Object.keys(uavList).map(key => ({ label: key }))}
          onSelect={handleSelect}
        />
        <StatusDisplay text={uav.status} status={signal} />
      </div>
    </div>
  )
}

export default StatusBar