import axios from "axios";
import NProgress from "nprogress";
const instance = axios.create({
  baseURL: "http://pandoraolaole-001-site1.btempurl.com/",
});
NProgress.configure({
  easing: "ease",
  trickleSpeed: 200,
  showSpinner: false,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    NProgress.start();
    return config;
  },
  function (error) {
    NProgress.start();
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response;
  },
  function (error) {
    NProgress.done();

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
