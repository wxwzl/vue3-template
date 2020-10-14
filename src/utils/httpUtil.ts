import axios from "axios";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
});
// 请求拦截
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    return config;
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  }
);
// 响应拦截
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    return response;
  },
  (error) => {
    // return Promise.reject(error)
    return Promise.reject(error);
  }
);
export default service;
