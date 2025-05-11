import axios from "axios";
import { useAuth } from '../../services/common/AuthProvider';

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/", // Replace with your API's base URL
  timeout: 10000, // Timeout for requests
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Exclude login/signup API from attaching the token
    const excludedEndpoints = ["/auth/validate-user", "/auth/create-user"]; // Add all paths that don't require a token

    // Check if the endpoint is excluded
    if (!excludedEndpoints.some((endpoint) => config.url.includes(endpoint))) {
      // Retrieve token from the globally exposed auth object
      const {authData} = useAuth();
      console.log(authData);
      const token = authData ? authData.token : null;

      // If token exists, attach it to the Authorization header
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Add a response interceptor (optional)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not a retry request
    if (error.response.status === 401 && 
        error.response.data.code === "TOKEN_EXPIRED" && 
        !originalRequest._retry) {
      
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        const refreshResponse = await axios.get(
          'http://localhost:8000/auth/refresh-token', 
          { withCredentials: true }
        );
        
        const { accessToken } = refreshResponse.data;
        
        // Update auth context with new token
        const { setAuthData } = useAuth();
        setAuthData(prev => ({ ...prev, token: accessToken }));
        
        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed - redirect to login
        console.error("Refresh token failed, redirecting to login...");
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
