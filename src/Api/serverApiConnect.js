import axios from 'axios';

class ConexionServer {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localHost:8083',
      timeout: 3000,
    });
  }
  getInstance() {
    return this.instance;
  }
}

const api = new ConexionServer().getInstance();

// Interceptores en las request de axios
api.interceptors.request.use( config => {

  config.headers = {
      ...config.headers,
      Authorization: localStorage.getItem('acces_token'),
      Refreshtoken: localStorage.getItem('refresh_token'),
  }

  return config;
});

export default api;

