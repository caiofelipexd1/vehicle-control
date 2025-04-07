import axios from 'axios';
import { getToken } from '../../helpers/token.js';

class AxiosInstance {
  constructor() {
    if (AxiosInstance.instance) {
      return AxiosInstance.instance;
    } else {
      const AUTH_TOKEN = getToken();
      this.axios = axios.create();
      this.axios.defaults.baseURL = process.env.REACT_APP_API_URL;
      this.axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      this.axios.timeout = process.env.REACT_APP_REQUEST_TIMEOUT;
      AxiosInstance.instance = this;
    }
  }

  exec = async (method, path, data) => {
    try {
      const request = await this.axios({
        method,
        url: `${this.axios.defaults.baseURL}${path}`,
        data,
      });
      return request.data;
    } catch(e) {
      throw e;
    }
  }
}

export default AxiosInstance;