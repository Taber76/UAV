import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

export const getUavList = async () => {
  const response = await axios.get(`${apiUrl}/uav/list`);
  return response
}

export const getUavInfo = async (selectedUAV, info) => {
  const response = await axios.get(`${apiUrl}/uav/info?uavname=${selectedUAV}&info=${info}`);
  if (response.status === 200) {
    return { ...response, valid: true }
  }
  return { valid: false }
}

