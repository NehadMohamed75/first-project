import axios, { AxiosError } from "axios";
import { FORBIDDEN, baseUrl } from "../configs/constants";
import { getAuthenticationToken } from "./authentication";

const axiosHttp = axios.create({
    baseURL: `${baseUrl}`,
});

axiosHttp.interceptors.request.use((config) => {    
    const auth_token = getAuthenticationToken()
    config.headers['token'] = auth_token
    
    return config;
},(error) => {
    return Promise.reject(error);
})

axiosHttp.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        if (error.response.status === FORBIDDEN) {
          location.href = `/welcome?redirected=true&redirected_from=${location.pathname}`;
        }
        // Handle other error scenarios if needed
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
      }
      return Promise.reject(error);
    }
  );
  

export default axiosHttp