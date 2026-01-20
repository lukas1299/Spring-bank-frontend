import './Account.css';
import { useEffect, useState } from "react";
import accountService from "./services/account.service";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const Account = () => {

    const [balance, setBalance] = useState("");

    const navigate = useNavigate();

    const loadAccountBalance = () => {
        accountService.loadAccountData().then(
            (response) => {
                setBalance(response.data.balance);
            }
        )
    }

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
    }

    useEffect(() => {
        loadAccountBalance();
    }, []);


    return (
        <div>
            <Navbar bg="dark"  data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Spring Bank</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Navbar.Text className="mx-3">
                        Balance: <a style={{color:"white"}}>{balance} $</a>
                    </Navbar.Text>
                    <Navbar.Text className="mx-4">
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                    <Button variant="secondary" onClick={handleLogout}>Log Out</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div style={{width:"60%", marginLeft:"30%", marginTop:"100px"}}>
            <Table className="table-dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
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