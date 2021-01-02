import axios from 'axios';

const request = axios.create({
  timeout: 1000 * 15,
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
