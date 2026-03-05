import axios from "axios"

const API_URL = 'http://localhost:8081/api' // Backend port 8081
const AI_API_URL = "http://localhost:8082/api/recommendations";

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    // Local storage se user ka naam uthao jo login ke waqt save hoga
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    
    if (user && user.name) {
        config.headers['X-User-ID'] = user.name; // Backend ab isi naam ka data dikhaye ga
    }

    return config;
});

// --- Naya Login Function ---
export const loginUser = (credentials) => api.post('/auth/login', credentials); // Ye AuthController ko hit karega

// --- Purane Functions ---
export const getActivities = () => api.get('/activities');
export const addActivity = (activity) => api.post('/activities', activity);
export const getActivityDetail = (id) => api.get(`/activities/${id}`);
// --- AI Recommendation Function ---
// Is se hum user ke liye AI ki taraf se mashwaray mangwaein ge
export const getAIRecommendations = (userId) => axios.get(`${AI_API_URL}/user/${userId}`);