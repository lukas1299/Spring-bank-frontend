import axios from "axios";
const GATEWAY_URL = "http://localhost:9090";


const loadTransactionData  = async (accountNumber, status, page) => {
    const response = await axios.get(GATEWAY_URL + "/transaction", {
        headers: {
            "Authorization": localStorage.getItem("accessToken"),

        }, 
        params: {
            "accountNumber": accountNumber,
            "status": status,
            "page": page, 
            "size": 6
        }
    });
    return response.data;
}

const transactionService = {
    loadTransactionData
}

export default transactionService;