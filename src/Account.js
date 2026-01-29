import './Account.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';
import { useEffect, useState } from "react";
import accountService from "./services/account.service";

const Account = () => {

    const [balance, setBalance] = useState("");
    const [username, setUsername] = useState("");


    const loadAccountInfo = () => {
        accountService.loadAccountData().then(
            (response) => {
                setBalance(response.data.balance);
                setUsername(response.data.username);
            }
        )
    }

    useEffect(() => {
            loadAccountInfo();
        }, []);

    return (
        <div>
            <CustomNavbar />

            <div style={{ width: "60%", marginLeft: "30%", marginTop: "100px", textAlign: "center" }}>

                <div style={{height:"130px", marginBottom:"10px", display:"flex"}}>
                    <div style={{backgroundColor:"#6d747d", height:"100%", width:"50%", borderTopLeftRadius:'10px', borderBottomLeftRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <h2 style={{fontWeight:"bold", color:"#232627", display:"flex", textAlign:"center", justifyContent:"center", }}>Hello!<h4 style={{marginLeft:"20px", marginTop:"5px"}}>{username}</h4></h2>
                    </div>
                    <div style={{backgroundColor:"#6d747d", height:"100%", width:"50%", borderTopRightRadius:"10px", borderBottomRightRadius:'10px', display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <h4 style={{color:"#232627"}}>Balance: <a style={{textDecoration:"underline"}}>{balance} $</a></h4>    
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        </div>
    );

}


export default Account;