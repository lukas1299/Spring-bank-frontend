
import { useEffect, useState } from "react";
import accountService from "../services/account.service";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Bell } from './icons/bell-fill.svg';
import { ReactComponent as Bank } from './icons/bank.svg';
import { ReactComponent as LogOut } from './icons/box-arrow-left.svg';
import Button from 'react-bootstrap/Button';
import TransferModal from "./TransferModal";

export default function CustomNavbar() {

    const [balance, setBalance] = useState("");
    const [username, setUsername] = useState("");
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const loadAccountInfo = () => {
        accountService.loadAccountData().then(
            (response) => {
                setBalance(response.balance);
                setUsername(response.username);
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
                    <Navbar.Brand><Bank style={{ width: "25px", height: "25px", color: "#41a23e" }} />  Spring Bank</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={handleShow}>Nowy przelew</Nav.Link>
                            <Nav.Link href="/transactions">Finanse</Nav.Link>
                            <Nav.Link href="/transactions">Odbiorcy</Nav.Link>
                        </Nav>
                        <Navbar.Text className="mx-3">
                            Dostępne środki: <a style={{ color: "white" }}>{balance} $</a>
                        </Navbar.Text>
                        <Navbar.Text className="mx-4">
                            Konto: <a href="/account">{username}</a>
                        </Navbar.Text>
                        <Bell className="mx-4" fill="white"></Bell>
                        <Button variant="secondary" onClick={handleLogout}><LogOut /></Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <TransferModal show={showModal} handleClose={handleClose} />
        </div>)

}