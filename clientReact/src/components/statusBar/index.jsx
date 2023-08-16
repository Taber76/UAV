import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DropdownButton from "../dropdownButton";
import StatusDisplay from "../statusDisplay";
import './styles.css';

import { select } from "../../store/uavSlice";

const StatusBar = () => {
  const [status, setStatus] = useState('Offline');
  const [signal, setSignal] = useState('disabled');
  
  const dipatch = useDispatch();
  const selectedUAV = useSelector((state) => state.uav.name);

  const handleSelect = (optionLabel) => {
    dipatch(select(optionLabel));
    if (optionLabel === 'No selected') {
      setStatus('Offline');
      setSignal('disabled');
    } else {
      setStatus('Disconnected');
      setSignal('caution');
    }
  }
  
  const options = [
    { label: "Guardian Forestal 1" },
    { label: "No selected" },
  ]

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