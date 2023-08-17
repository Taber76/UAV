import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DropdownButton from "../dropdownButton";
import StatusDisplay from "../statusDisplay";
import './styles.css';

import { select, connecting, connected, disconnect } from "../../store/uavSlice";
import { getConnected, getStatus } from "../../services/uavService";

const StatusBar = () => {
   const [signal, setSignal] = useState('disabled');

  //--------
  const options = [ // esto debe venir del server
    { label: "Guardian Forestal 1" },
    { label: "No selected" },
  ]
  //---------

  const dispatch = useDispatch();
  const selectedUAV = useSelector((state) => state.uav.uavname);
  const connectedUAV = useSelector((state) => state.uav.connected);
  const status = useSelector((state) => state.uav.status);

  const handleSelect = async (optionLabel) => { // cuando seleciono una opcion
    dispatch(select(optionLabel));

    if (optionLabel === 'No selected') {
      dispatch(disconnect());
      setSignal('disabled');
    } else {

      const response = await getConnected(optionLabel);
      if (response.result) {
        dispatch(connected());
        setSignal('caution');
      } else {
        dispatch(connecting())
        setSignal('caution');
      }
    }
  }
  
  const fetchUavStatus = async () => {
    if (connectedUAV) {
      const response = await getStatus(selectedUAV);
      console.log(response);
      return response;
    }
  }

  useEffect(() => {
    const interval = setInterval(fetchUavStatus, 2000) 
      return () => {
      clearInterval(interval)
    }
  }, [connectedUAV, selectedUAV]);
  

  return (
    <div className="statusBar">
      <div></div>
      <div></div>
      <div>
        <DropdownButton buttonText={selectedUAV} options={options} onSelect={handleSelect} />
        <StatusDisplay text={status} status={signal} />
      </div>
    </div>
  )
}

export default StatusBar