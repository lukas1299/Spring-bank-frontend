import './Account.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';
import { useEffect, useState } from "react";
import accountService from "./services/account.service";
import transactionService from './services/transaction.service';
import { Button } from 'react-bootstrap';
import {ReactComponent as OpenBook} from './icons/book.svg';
import {ReactComponent as CashCoin} from './icons/cash-coin.svg';

const Account = () => {

    const [balance, setBalance] = useState("");
    const [username, setUsername] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    const [transactions, setTransactions] = useState([]);


    const loadAccountInfo = async () => {
        const response = await accountService.loadAccountData();

        setBalance(response.balance);
        setUsername(response.username);
        setAccountNumber(response.accountNumber);

        return response;

    }

    const loadTransactionData = async (accountNumber, status) => {
        const response = await transactionService.loadTransactionData(accountNumber, status);
        setTransactions(response);
    }

    useEffect(() => {
        const loadData = async () => {
            const accNumber = await loadAccountInfo();
            await loadTransactionData(accNumber.accountNumber, null); 
        };

        loadData();

    }, []);

    return (
        <div>
            <CustomNavbar />
            

            <div style={{ marginLeft: "5%", marginTop: "100px", textAlign: "center", display:"flex" }}>

                <div style={{backgroundColor:"#6d747d", width:"300px" ,height:"500px", marginRight:"10px", borderTopLeftRadius:"10px", borderTopRightRadius:"10px"}}>
                    <div style={{backgroundColor:"#6d747d", height:"130px", borderBottomStyle:"solid", borderTopLeftRadius:"10px", borderTopRightRadius:"10px", textAlign:"left"}}>
                        <div style={{marginLeft:"15px",alignItems: "center", justifyContent: "left"}}>
                            <h5>....</h5>
                            <a>Numer rachunku: 341413...314134</a>
                        </div>
                    </div>
                    <div style={{backgroundColor:"#6d747d", height:"50px", display:"flex", justifyContent:"center", margin:"10px", gap:"16px"}}>
                        <Button variant='primary'><a style={{fontWeight:"bold"}}>Historia</a> <OpenBook /></Button>
                        <Button variant='primary'><a style={{fontWeight:"bold"}}>Przelew</a> <CashCoin /></Button>
                    </div>
                </div>
                <div style={{width:"70%"}}>
                <div style={{ height: "130px", marginBottom: "10px", display: "flex" }}>
                    <div style={{ backgroundColor: "#6d747d", height: "100%", width: "50%", borderTopLeftRadius: '10px', borderBottomLeftRadius: "10px", display: "flex", alignItems: "center", justifyContent: "left" }}>
                        <h4 style={{ fontWeight: "bold", color: "white", textDecoration:"", display: "flex", marginLeft:"15%", textShadow:"1px 1px 2px black"}}>Witaj !<h5 style={{ marginLeft: "20px", marginTop:"3px" }}>{username}</h5></h4>
                    </div>
                    <div style={{ backgroundColor: "#6d747d", height: "100%", width: "50%", borderTopRightRadius: "10px", borderBottomRightRadius: '10px', display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h5 style={{ color: "white", fontWeight:"bold", textShadow:"1px 1px 2px black"}}>Dostępne środki: <a style={{ textDecoration: "underline" }}>{balance} $</a></h5>
                    </div>
                </div>

                <Table className="table-dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nadawca</th>
                            <th>Data</th>
                            <th>Kwota</th>
                            <th>Operacje</th>
                            <th>Status</th>
                            <th>Szczegóły</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>.</td>
                                <td>.</td>
                                <td>{transaction.createDate}</td>
                                <td style={{textDecoration:"underline"}}>{transaction.amount} $</td>
                                <td>.</td>
                                {transaction.transactionStatus === "REALIZED" 
                                ? <td style={{color:"green", fontWeight:"bold"}}>V</td> 
                                : transaction.transactionStatus === "CANCELED"
                                ? <td style={{color:"red", fontWeight:"bold"}}>X</td> 
                                : transaction.transactionStatus === "PENDING"
                                ? <td style={{color:"yellow", fontWeight:"bold"}}>?</td> 
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