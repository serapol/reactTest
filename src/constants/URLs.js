const serverConfig = require('../../config/server.config');

const API_URL = `http://${serverConfig.host}:${serverConfig.port}/api`;

export const API_USER_URL = `${API_URL}/user`;
export const API_LOGIN_URL = `${API_URL}/login`;
export const API_LOGOUT_URL = `${API_URL}/logout`;
export const API_MAP_POINTS_URL = `${API_URL}/map-points`;
