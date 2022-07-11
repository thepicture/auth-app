import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create();

api.interceptors.response.use(response => response, error => {
    if (error.response.status === 401 && !!Cookies.get("user")) {
        Cookies.remove("user");
        window.location.href = "/login";
    }
    else
        return error;
});

export default api;