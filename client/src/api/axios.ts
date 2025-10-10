import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: `${API_URL}/api`, // Use backticks to create a template literal
  withCredentials: true,
});

export default api;
