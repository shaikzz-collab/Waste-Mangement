import axios from "axios";

// Default local Flask backend url
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor to attach user tracking headers
api.interceptors.request.use(
  (config) => {
    try {
      const savedUser = localStorage.getItem("wasteguide_demo_user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user && user.uid) {
          config.headers["X-User-Id"] = user.uid;
        }
      }
    } catch (e) {
      console.error("Error reading user token for API headers", e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const wasteService = {
  scanText: async (itemName) => {
    const response = await api.post("/waste/scan", { itemName });
    return response.data;
  },
  
  scanImage: async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    
    const response = await api.post("/waste/scan", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  },
  
  getHistory: async () => {
    const response = await api.get("/waste/history");
    return response.data;
  }
};

export const centerService = {
  getCenters: async (category = "") => {
    const params = {};
    if (category && category !== "All") {
      params.category = category;
    }
    const response = await api.get("/centers", { params });
    return response.data;
  }
};

export const dashboardService = {
  getStats: async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
  }
};

export default api;
