import axios from "axios";
const GATEWAY_URL = "http://localhost:9090";

const loadAccountData = () => {
    return axios.get(GATEWAY_URL + "/account/info", {
       headers: {
        "Authorization": localStorage.getItem("accessToken")
       } 
    }).then((response) => {
        return response;
    })
}

const accountService = {
    loadAccountData
}

export default accountService;