import axios from "axios";
import { history } from '../index';

const api = axios.create();

api.interceptors.request.use(config => {
    config.withCredentials = true;
    return config;
});

api.interceptors.response.use(response => response, async (error) => {
    if (error.response.status === 401) {
        if (error.config.isTriedToGetAccessToken) {
            history.replace("/login");
        } else {
            await api.get("/api/getAccessToken");
            error.config.isTriedToGetAccessToken = true;
            return api(error.config);
        }
    }
});

export default api;