import axios from "axios";
const GATEWAY_URL = "http://localhost:9090";

const login = (login, password) => {
    return axios.post(GATEWAY_URL + "/auth/login", {
        login, 
        password
    }).then((response) => {
        return response;
    })
};

const register = (username, surname, password, roles) => {
    return axios.post(GATEWAY_URL + "/auth/register", {
        username,
        surname,
        password,
        roles
    }).then((response)=> {
        return response;
    })
}

const authService = {
    login,
    register
};

export default authService;