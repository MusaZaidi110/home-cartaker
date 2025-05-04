import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/", // Replace with your API's base URL
  timeout: 10000, // Timeout for requests
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Exclude login/signup API from attaching the token
    const excludedEndpoints = ["/login/patient", "/login/staff"]; // Add all paths that don't require a token

    // Check if the endpoint is excluded
    if (!excludedEndpoints.some((endpoint) => config.url.includes(endpoint))) {
      // Retrieve token from the globally exposed auth object
      const authData = window.auth.getAuthData();
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
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Handle token expiration or unauthorized errors here
    }
    return Promise.reject(error);
  }
);

export default api;
