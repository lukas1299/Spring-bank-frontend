
import { useEffect, useState } from "react";
import accountService from "./services/account.service";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CustomNavbar() {


    const [balance, setBalance] = useState("");
    const [username, setUsername] = useState("");


    const navigate = useNavigate();

    const loadAccountInfo = () => {
        accountService.loadAccountData().then(
            (response) => {
                setBalance(response.data.balance);
                setUsername(response.data.username);
            }
        )
    }

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
    }

    useEffect(() => {
        loadAccountInfo();
    }, []);


    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Spring Bank</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/transactions">Transactions</Nav.Link>
                            <Nav.Link >Link</Nav.Link>
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
                            Balance: <a style={{ color: "white" }} href="/#">{balance} $</a>
                        </Navbar.Text>
                        <Navbar.Text className="mx-4">
                            Signed in as: <a href="/account">{username}</a>
                        </Navbar.Text>
                        <Button variant="secondary" onClick={handleLogout}>Log Out</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>)

}