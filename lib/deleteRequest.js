import axios from "axios";
import { parseCookies } from 'nookies';
import hostname from "./config";

export default async function deleteRequest(url) {
  const cookies = parseCookies()
  const config = {
    headers: { 
      Authorization: cookies?.token,
    }
};
    try {
        const res = await axios.delete(hostname+'/api/v1'+url, config)
        if(res.hasOwnProperty('data')){
            return res?.data
        }else{
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
          }
        } catch (error) {
        console.log('error============',error?.response)
        return error?.response?.data;
    }
}