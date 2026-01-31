import './Account.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar';
import { useEffect, useState, useRef } from "react";
import accountService from "./services/account.service";
import transactionService from './services/transaction.service';
import currencyService from './services/currency.service';

import { ReactComponent as OpenBook } from './icons/book.svg';
import { ReactComponent as CreditCardItem } from './icons/credit-card.svg';
import { ReactComponent as CheckIcon } from './icons/check-circle-fill.svg';
import { ReactComponent as XIcon } from './icons/x-circle-fill.svg';
import { ReactComponent as QuestionIcon } from './icons/question-circle-fill.svg';
import { ReactComponent as Cart } from './icons/cart4.svg';
import { ReactComponent as ArrowLeft } from './icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from './icons/arrow-right.svg';
import "flag-icons/css/flag-icons.min.css";
import person from './img/person.png';
import { useNavigate } from 'react-router-dom';

const Account = () => {

    const [balance, setBalance] = useState("");
    const [username, setUsername] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [usdRate, setUsdRate] = useState("");
    const [cadRate, setCadRate] = useState("");
    const [gbpRate, setGbpRate] = useState("");
    const pageEl = useRef(0);
    const [currentPage, setCurrentPage] = useState(pageEl.current);

    const [transactions, setTransactions] = useState([]);

    const navigate = useNavigate();

    const loadAccountInfo = async () => {
        const response = await accountService.loadAccountData();

        setBalance(response.balance);
        setUsername(response.username);
        setAccountNumber(response.accountNumber);

        return response;

    }

    const loadTransactionData = async (accountNumber, status, page) => {
        const response = await transactionService.loadTransactionData(accountNumber, status, page);
        setTransactions(response);
        return response;
    }

    const loadCurrencyRates = async (code) => {
        let response = await currencyService.loadCurrencyRates(code);
        response = response.data.rates[0].mid.toString().substring(0, 5);
        if (code === "USD") {
            setUsdRate(response);
        } else if (code === "CAD") {
            setCadRate(response);
        } else {
            setGbpRate(response);
        }
    }

    const handleLeftArrowClick = () => {

        if (pageEl.current > 0) {
            pageEl.current = pageEl.current - 1;
            setCurrentPage(pageEl.current);
            loadTransactionData(accountNumber, null, pageEl.current);

        } else {
            pageEl.current = 0;
            setCurrentPage(0);
        }
    }

    const handleRightArrowClick = () => {
        if (transactions.length == 0) {
            loadTransactionData(accountNumber, null, pageEl.current);

        } else {
            pageEl.current = pageEl.current + 1;
            setCurrentPage(pageEl.current);

            loadTransactionData(accountNumber, null, pageEl.current);

        }
    }
    const handleSideNumerPagination = (number) => {
        loadTransactionData(accountNumber, null, number);
        pageEl.current = number;
    }

    useEffect(() => {
        const loadData = async () => {
            const accNumber = await loadAccountInfo();
            await loadTransactionData(accNumber.accountNumber, null, 0);
        };

        loadData();
        loadCurrencyRates("USD");
        loadCurrencyRates("GBP");
        loadCurrencyRates("CAD");

    }, []);

    return (
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css" />
            <CustomNavbar />

            <div style={{ marginLeft: "5%", marginTop: "100px", display: "flex" }}>

                <div style={{ backgroundColor: "#212529", width: "300px", height: "550px", marginRight: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                    <div style={{ backgroundColor: "#212529", height: "130px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", textAlign: "left" }}>
                        <div style={{ color: "white", margin: "25px", alignItems: "center", justifyContent: "left" }}>
                            <h5><img src={person} style={{ height: "40px", width: "40px", margin: "10px" }} />Łukasz Matusik</h5>
                            <a>Numer rachunku: {accountNumber.substring(10, 17)}...</a>
                        </div>
                    </div>
                    <div style={{ height: "150px", margin: "10px" }}>

                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", height: "50px", cursor: "pointer" }} onClick={() => navigate("/transactions")}>
                            <a style={{ fontWeight: "bold", fontSize: "15px", marginLeft: "-30px", color: "white" }}><OpenBook style={{ margin: "5px", width: "30px", height: "20px" }} />Historia</a>
                        </div>
                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", height: "50px", cursor: "pointer" }} onClick={() => navigate("/cards")}>
                            <a style={{ fontWeight: "bold", fontSize: "15px", marginLeft: "22px", color: "white" }}><CreditCardItem style={{ margin: "5px", width: "30px", height: "20px" }} />Karty płatnicze</a>
                        </div>
                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", height: "50px", cursor: "pointer" }}>
                            <a style={{ fontWeight: "bold", fontSize: "15px", marginLeft: "-22px", color: "white" }}><Cart style={{ margin: "5px", width: "30px", height: "20px" }} />Produkty</a>
                        </div>

                    </div>
                    <div style={{ height: "200px", alignItems: "center", justifyContent: "left", marginTop: "40px" }}>
                        <a style={{ color: "white", margin: "20px", fontWeight: "bold" }}>Kursy walut</a>
                        <div style={{ margin: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <a style={{ color: "white", margin: "5px", fontWeight: "bold" }}>Waluta</a>
                                <a style={{ color: "white", margin: "5px", fontWeight: "bold" }}>Kurs</a>

                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <a style={{ color: "white", margin: "5px", fontWeight: "bold" }}>CAD <span class="fi fi-ca"></span></a>
                                <a style={{ color: "white", margin: "5px" }}>{cadRate}</a>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <a style={{ color: "white", margin: "5px", fontWeight: "bold" }}>USD <span class="fi fi-us"></span></a>
                                <a style={{ color: "white", margin: "5px" }}>{usdRate}</a>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <a style={{ color: "white", margin: "5px", fontWeight: "bold" }}>GBP <span class="fi fi-gb"></span></a>
                                <a style={{ color: "white", margin: "5px" }}>{gbpRate}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: "70%" }}>
                    <div style={{ height: "130px", marginBottom: "10px", display: "flex" }}>
                        <div style={{ backgroundColor: "#212529", height: "100%", width: "50%", borderTopLeftRadius: '10px', borderBottomLeftRadius: "10px", display: "flex", alignItems: "center", justifyContent: "left" }}>
                            <h4 style={{ fontWeight: "bold", color: "white", textDecoration: "", display: "flex", marginLeft: "15%", textShadow: "1px 1px 2px black" }}>Witaj !<a style={{ marginLeft: "20px", fontSize: "20px", marginTop: "2px" }}>{username}</a></h4>
                        </div>
                        <div style={{ backgroundColor: "#212529", height: "100%", width: "50%", borderTopRightRadius: "10px", borderBottomRightRadius: '10px', display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h5 style={{ color: "white", fontWeight: "bold", textShadow: "1px 1px 2px black" }}>Dostępne środki: <a>{balance} $</a></h5>
                        </div>
                    </div>

                    <div style={{ height: "25px", backgroundColor: "white", display: "flex", marginBottom: "2px", alignItems: "center", justifyContent: "right", marginRight: "40px" }}>
                        <div style={{ display: "flex" }}>
                            <div onClick={handleLeftArrowClick} style={{ width: "20px", height: "20px", backgroundColor: "#212529", margin: "3px", cursor: "pointer", display: "flex", alignItems: "center", borderRadius: "5px" }}><ArrowLeft style={{ color: "white", margin: "2px" }} /> </div>
                            <div onClick={() => handleSideNumerPagination(0)} style={{ width: "20px", height: "20px", backgroundColor: "#212529", margin: "3px", cursor: "pointer", display: "flex", alignItems: "center", borderRadius: "5px" }}><a style={{ color: "white", fontWeight: "bold", margin: "5px" }}>1</a> </div>
                            <div onClick={() => handleSideNumerPagination(1)} style={{ width: "20px", height: "20px", backgroundColor: "#212529", margin: "3px", cursor: "pointer", display: "flex", alignItems: "center", borderRadius: "5px" }}><a style={{ color: "white", fontWeight: "bold", margin: "5px" }}>2</a> </div>
                            <div onClick={handleRightArrowClick} style={{ width: "20px", height: "20px", backgroundColor: "#212529", margin: "3px", cursor: "pointer", display: "flex", alignItems: "center", borderRadius: "5px" }}><ArrowRight style={{ color: "white", margin: "2px" }} /> </div>
                        </div>
                    </div>

                    <Table className="table-dark" style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>Nadawca</th>
                                <th>Data</th>
                                <th>Kwota</th>
                                <th>Status</th>
                                <th>Szczegóły</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id} style={{ backgroundColor: "#c34f41", height: "50px" }}>
                                    <td>.</td>
                                    <td>{transaction.createDate}</td>
                                    <td>{transaction.amount} $</td>
                                    {transaction.transactionStatus === "REALIZED"
                                        ? <td style={{ color: "green", fontWeight: "bold" }}><CheckIcon style={{ color: "#41a23e" }} /></td>
                                        : transaction.transactionStatus === "CANCELED"
                                            ? <td style={{ color: "red", fontWeight: "bold" }}><XIcon style={{ color: "#c34f41" }} /></td>
                                            : transaction.transactionStatus === "PENDING"
                                                ? <td style={{ color: "yellow", fontWeight: "bold" }}><QuestionIcon style={{ color: "#dcd04b" }} /></td>
                                                : <td>.</td>}
                                    <td>.</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    );

}


export default Account;