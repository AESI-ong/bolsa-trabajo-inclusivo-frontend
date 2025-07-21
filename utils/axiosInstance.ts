import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 🔥 Necesario para que se mande la cookie (refresh_token)
});

console.log('Axios instance creada con baseURL:', process.env.NEXT_PUBLIC_API_BASE_URL);

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

// Interceptor para refrescar el token
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem('access_token');

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      token
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.access_token;
        localStorage.setItem('access_token', newAccessToken);

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

export default api;