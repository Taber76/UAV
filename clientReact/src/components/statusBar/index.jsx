import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import DropdownButton from "../dropdownButton";
import StatusDisplay from "../statusDisplay";
import './styles.css';

import { select, connecting, connected, disconnect } from "../../store/uavSlice";
import { getConnected, getStatus } from "../../services/uavService";
const apiUrl = import.meta.env.VITE_API_URL

const StatusBar = () => {
  const [signal, setSignal] = useState('disabled');
  const [options, setOptions] = useState({});

  const dispatch = useDispatch();
  const selectedUAV = useSelector((state) => state.uav.uavname);
  const connectedUAV = useSelector((state) => state.uav.connected);
  const status = useSelector((state) => state.uav.status);

  const handleSelect = async (optionLabel) => { // cuando seleciono una opcion
    dispatch(select(optionLabel));

    if (optionLabel === 'Unselected') {
      dispatch(disconnect());
      setSignal('disabled');
    } else {

      await getConnected(options[optionLabel]);
      console.log(options[optionLabel]);

      /*
      if (response.result) {
        dispatch(connected());
        setSignal('caution');
      } else {
        dispatch(connecting())
        setSignal('caution');
      }
      */
    }
  }
 
  useEffect(() => {
    async function fetchUavList() {
      const response = await axios.get(`${apiUrl}/uav/list`)
      if (response.status === 200) {
        response.data.Unselected = {}
        setOptions(response.data)
      }
      return 
          }
    fetchUavList()
  }, [])

  useEffect(() => {
    async function fetchUavStatus() {
      if (connectedUAV) {
        const response = await getStatus(selectedUAV);
        console.log(response);
        return response;
      }
    }
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
        <DropdownButton buttonText={selectedUAV} options={Object.keys(options).map(key => ({ label: key }))} onSelect={handleSelect} />
        <StatusDisplay text={status} status={signal} />
      </div>
    </div>
  )
}

export default StatusBar