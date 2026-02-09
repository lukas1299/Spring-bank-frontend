import axios from "axios";
const GATEWAY_URL = "http://localhost:9090";

const getCreditCardsBelongingToAccount = async (accountNumber) => {
    const response = await axios.get(GATEWAY_URL + "/account/" + accountNumber + "/creditCard", {
        body: {
            "cardLimit":5000
        },
        headers: {
            "Authorization": localStorage.getItem("accessToken")
        }
        
    });
    return response.data;
};

const cardSuspend = async (cardId) => {
    const response = await axios.post(GATEWAY_URL + "/creditCard/" + cardId + "/suspend", null, {
        headers: {
            "Authorization": localStorage.getItem("accessToken")
        }
    });
    return response.data;
}

const creditCardService = {
    getCreditCardsBelongingToAccount,
    cardSuspend
}

export default creditCardService;