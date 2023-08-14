import axios from "axios";
import { parseCookies } from 'nookies';
import hostname from "./config";

export default async function request(url,token=null) {
  const cookies = parseCookies()
  // console.log('token',token)
  
  const config = {
    headers: { Authorization: `${token ? token : cookies?.token}` }
  };

  try {
  const res = await axios.get(`${hostname}/api/v1/${url}`,config);
  // console.log('rrrrrrrrrrr',res)
  
  return res.data;
    
  } catch (error) {
    console.log('eroooooooooooooooor',error)
  }
}