import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // 🔥 Necesario para que se mande la cookie (refresh_token)
});

// Interceptor para incluir el access_token en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error fue 401 y no estamos intentando ya renovar...
    const token = localStorage.getItem('access_token');

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      token // ← ✅ Solo intenta refresh si hay access_token
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          'http://localhost:8000/api/refresh-token',
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.access_token;
        localStorage.setItem('access_token', newAccessToken);

        // Reintentar la petición original con el nuevo token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token falló:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
