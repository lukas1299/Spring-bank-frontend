import axios from "axios";
const GATEWAY_URL = "http://localhost:9090";

const loadAccountData = async () => {
    const response = await axios.get(GATEWAY_URL + "/account/info", {
        headers: {
            "Authorization": localStorage.getItem("accessToken")
        }
    });
    return response.data;
}

const accountService = {
    loadAccountData
}

export default accountService;