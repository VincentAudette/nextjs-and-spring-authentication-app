import axios from "axios";

// Create a new instance of axios with the config defaults
const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Add a request interceptor to the instance
instance.interceptors.request.use(config => {
  // Add the Authorization header to the config
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbmlzdHJhdGV1ciIsInJvbGUiOiJBRE1JTklTVFJBVEVVUiJ9.qlU4kbS6dD3daGbLfoWDrFT9G8o9KRxW1S7Z6lH19o8`;

  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

export default instance;
