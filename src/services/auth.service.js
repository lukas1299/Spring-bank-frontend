import axios from "axios";
const GATEWAY_URL = "http://localhost:9090";

const login = async (login, password) => {
    const response = await axios.post(GATEWAY_URL + "/auth/login", {
        login,
        password
    });
    return response;
};

const register = async (username, surname, password, roles) => {
    const response = await axios.post(GATEWAY_URL + "/auth/register", {
        username,
        surname,
        password,
        roles
    });
    return response;
}

const authService = {
    login,
    register
};

export default authService;