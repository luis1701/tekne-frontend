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
export default api;