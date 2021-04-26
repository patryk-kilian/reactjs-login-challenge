import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const defaultOptions = {
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const api = axios.create(defaultOptions);

api.interceptors.request.use(function (config) {
  const token = cookies.get('token');
  config.headers.authorization = token ? token : '';
  return config;
});

export default api;
