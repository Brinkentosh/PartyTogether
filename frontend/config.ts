const DEV_IP = '192.168.0.104';
const PORT = '5136';

export const API_URL = `http://${DEV_IP}:${PORT}/api`;

export const ENDPOINTS = {
  LOGIN: `${API_URL}/Auth/login`,
  REGISTER: `${API_URL}/Auth/register`,
};