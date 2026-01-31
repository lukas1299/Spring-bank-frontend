import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar';
import { useEffect, useState } from "react";
import accountService from "./services/account.service";
import transactionService from './services/transaction.service';
import currencyService from './services/currency.service';

import {ReactComponent as OpenBook} from './icons/book.svg';
import {ReactComponent as CreditCardItem} from './icons/credit-card.svg';
import {ReactComponent as Cart} from './icons/cart4.svg';

import "flag-icons/css/flag-icons.min.css";
import person from './img/person.png';

import { useNavigate } from 'react-router-dom';
import Card from './components/Card';

const CreditCard = () => {

    const [balance, setBalance] = useState("");
    const [username, setUsername] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [usdRate, setUsdRate] = useState("");
    const [cadRate, setCadRate] = useState("");
    const [gbpRate, setGbpRate] = useState("");

    const navigate = useNavigate();

    const loadAccountInfo = async () => {
        const response = await accountService.loadAccountData();

        setBalance(response.balance);
        setUsername(response.username);
        setAccountNumber(response.accountNumber);

        return response;

    }

    const loadCurrencyRates = async (code) => {
        let response = await currencyService.loadCurrencyRates(code);
        response = response.data.rates[0].mid.toString().substring(0,5);
        if (code === "USD"){
            setUsdRate(response);
        } else if (code === "CAD"){
            setCadRate(response);
        } else {
            setGbpRate(response);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            const accNumber = await loadAccountInfo();
           
        };

        loadData();
        loadCurrencyRates("USD");
        loadCurrencyRates("GBP");
        loadCurrencyRates("CAD");

    }, []);
    return (<div>
        <CustomNavbar />

        <div style={{ marginLeft: "5%", marginTop: "100px", display:"flex" }}>

                <div style={{backgroundColor:"#212529", width:"300px" ,height:"550px", marginRight:"10px", borderTopLeftRadius:"10px", borderTopRightRadius:"10px", borderBottomLeftRadius:"10px", borderBottomRightRadius:"10px"}}>
                    <div style={{backgroundColor:"#212529", height:"130px", borderTopLeftRadius:"10px", borderTopRightRadius:"10px", textAlign:"left"}}>
                        <div style={{color:"white", margin:"25px",alignItems: "center", justifyContent: "left"}}>
                            <h5><img src={person} style={{height:"40px", width:"40px", margin:"10px"}}/>Łukasz Matusik</h5>
                            <a>Numer rachunku: {accountNumber.substring(10, 17)}...</a>
                        </div>
                    </div>
                    <div style={{height:"150px", margin:"10px"}}>
                        
                        <div style={{ width:"100%", display: "flex", alignItems: "center", justifyContent: "center", height:"50px", cursor:"pointer"}} onClick={() => navigate("/transactions")}>
                            <a style={{fontWeight:"bold", fontSize:"15px", marginLeft:"-30px", color:"white" }}><OpenBook style={{margin:"5px", width:"30px", height:"20px"}}/>Historia</a>
                        </div>
                        <div style={{ width:"100%", display: "flex", alignItems: "center", justifyContent: "center", height:"50px", cursor:"pointer"}} onClick={() => navigate("/cards")}>
                            <a style={{fontWeight:"bold", fontSize:"15px", marginLeft:"22px", color:"white"}}><CreditCardItem style={{margin:"5px", width:"30px", height:"20px"}}/>Karty płatnicze</a>
                        </div>
                        <div style={{ width:"100%", display: "flex", alignItems: "center", justifyContent: "center", height:"50px", cursor:"pointer"}} onDrag={{}}>
                            <a style={{fontWeight:"bold", fontSize:"15px", marginLeft:"-22px", color:"white"}}><Cart style={{margin:"5px", width:"30px", height:"20px"}}/>Produkty</a>
                        </div>
                    
                    </div>
                    <div style={{height:"200px", alignItems: "center", justifyContent: "left", marginTop:"40px"}}>
                        <a style={{color:"white", margin:"20px", fontWeight:"bold"}}>Kursy walut</a>
                        <div style={{margin:"20px"}}>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <a style={{color:"white", margin:"5px", fontWeight:"bold"}}>Waluta</a>
                                <a style={{color:"white", margin:"5px", fontWeight:"bold"}}>Kurs</a>
                                
                            </div>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <a style={{color:"white", margin:"5px", fontWeight:"bold"}}>CAD <span class="fi fi-ca"></span></a>
                                <a style={{color:"white", margin:"5px"}}>{cadRate}</a>
                               
                            </div>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <a style={{color:"white", margin:"5px", fontWeight:"bold"}}>USD <span class="fi fi-us"></span></a>
                                <a style={{color:"white", margin:"5px"}}>{usdRate}</a>
                               
                            </div>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <a style={{color:"white", margin:"5px", fontWeight:"bold"}}>GBP <span class="fi fi-gb"></span></a>
                                <a style={{color:"white", margin:"5px"}}>{gbpRate}</a>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div style={{width:"70%"}}>
                <div style={{ height: "130px", marginBottom: "10px", display: "flex" }}>
                    <div style={{ backgroundColor: "#212529", height: "100%", width: "50%", borderTopLeftRadius: '10px', borderBottomLeftRadius: "10px", display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <h4 style={{ fontWeight: "bold", color: "white", textDecoration:"", display: "flex", marginLeft:"15%", textShadow:"1px 1px 2px black"}}>Dostępne karty płatnicze</h4>
                    </div>
                    <div style={{ backgroundColor: "#212529", height: "100%", width: "50%", borderTopRightRadius: "10px", borderBottomRightRadius: '10px', display: "flex", alignItems: "center", justifyContent: "right" }}>
                       <div style={{display:"flex", marginRight:"10px"}}>
                        <a style={{color:"white", cursor:"pointer", fontWeight:"bold", marginRight:"20px"}}>Zamów nową kartę</a>
                    
                       </div>
                    </div>
                </div>  

                <div style={{backgroundColor:"#212529", height:"410px", borderRadius:"10px", display:"flex"}}>
                    <Card cardNumber={"3441 0000 3414 4356"} username={"John"} surname={"Snow"} expitedTime={"10/30"}/>
                    <Card cardNumber={"4325 0000 5455 6345"} username={"Carl"} surname={"White"} expitedTime={"11/32"}/>
                </div>

                
                </div>
            </div>
    </div>);
}

export default CreditCard;