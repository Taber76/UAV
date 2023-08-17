import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

export const getConnected = async (selectedUAV) => {
    const response = await axios.get(`${apiUrl}/uav/clientconnect?name=${selectedUAV}`);
    if (response.status === 200) {
      return response.data
    }
  }  

  export const getStatus = async (selectedUAV) => {
    const response = await axios.get(`${apiUrl}/uav/status?name=${selectedUAV}`);
    if (response.status === 200) {
      return response
    }
  }
