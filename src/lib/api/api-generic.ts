import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from './api-routes';
import { toast } from 'sonner';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config to add the authorization header, if needed
    console.log("INTERCEPTOR ON ACTION : ", config);
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    toast({ title: response.status, description: response.message})
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error(`INTERCEPTOR IN RESPONSE : ${error}`);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      return;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    console.log(`Error Log : ${error}`)
    console.error(`Error : ${error}`)
    return Promise.reject(error);
});

type GlobalApiResponse = {
    status: string,
    data: any,
    message: string
}


export const get_data = (path: string) => {


}

export const post_data = async (path: string, data: any) => {
    let res;
    try {
        console.info(`REQUEST FOR POST: ${BASE_URL + path} WITH DATA : ${data}`);
        res = await axiosInstance.post(path,data);
        console.log("RESPONSE : ", res);

    } catch (error) {
       console.log("ERROR :", error.response.data);
       let data = error.response.data;
       toast.error(data.message, {position: 'top-right'});
       return;
    }

    // todo: toast notification
    if(res)
        return res;
}

