import axios from "axios";
const GATEWAY_URL = "http://localhost:9090";


const loadTransactionData  = async (accountNumber, status) => {
    const response = await axios.get(GATEWAY_URL + "/transaction", {
        headers: {
            "Authorization": localStorage.getItem("accessToken"),

        }, 
        params: {
            "accountNumber": accountNumber,
            "status": status,
            "page": 0, 
            "size:": 10
        }
    });
    return response.data;
}

const transactionService = {
    loadTransactionData
}

export default transactionService;