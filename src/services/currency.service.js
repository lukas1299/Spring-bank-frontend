import axios from "axios";
const NBP_API_URL = "https://api.nbp.pl/api/exchangerates/rates/A/";

const loadCurrencyRates = async (code) => {
    const response = await axios.get(NBP_API_URL + code);
    return response;
}

const currencyService = {
    loadCurrencyRates
}

export default currencyService;