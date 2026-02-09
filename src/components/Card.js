import mc from './img/mc.png';
import chip from './img/chip.jpeg';
import { useState} from 'react';
import { ReactComponent as CheckIcon } from './icons/check-circle-fill.svg';
import { ReactComponent as XIcon } from './icons/x-circle-fill.svg';
import { ReactComponent as QuestionIcon } from './icons/question-circle-fill.svg';
import Toast from 'react-bootstrap/Toast';
import creditCardService from '../services/creditCard.service';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as FillGearIcon } from './icons/gear-fill.svg';
import { Button } from 'react-bootstrap';

export default function Card({cardId, cardNumber, expitedTime, username, surname, status, onCheckedChange}) {

    const [showA, setShowA] = useState(false);

    const navigate = useNavigate();

    function timeout(number) {
    return new Promise( res => setTimeout(res, number) );
}

    const cardSuspend = async () => {
        creditCardService.cardSuspend(cardId);
        onCheckedChange(true);
        await timeout(2000);
        navigate(0);
    }

    const toggleShowA = () => {
        if (status !== "SUSPENDED") {
            setShowA(!showA);
        }
    }

    return (<>
        <div style={{ width: "250px", height: "150px", backgroundColor: "white", margin: "20px", borderRadius: "5px", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "250px", height: "20%", backgroundColor: "#f0efec", display: "flex", justifyContent: "right", borderRadius: "5px", alignItems: "center" }}>
                <a style={{ fontSize: "12px" }}>Debit Card</a>
                <img style={{ width: "35px", borderRadius: "5px" }} src={mc}></img>
            </div>
            <div style={{ height: "30%", backgroundColor: "white" }}>
                <img style={{ width: "40px", marginLeft: "30px" }} src={chip}></img>
            </div>
            <div style={{ textAlign: "center" }}>
                <a style={{ fontWeight: "bold" }}>{String(cardNumber).substring(0, 4) + " " + String(cardNumber).substring(4, 8) + " " + String(cardNumber).substring(8, 12) + " " + String(cardNumber).substring(12, 16)}</a>
            </div>
            <div style={{ backgroundColor: "#f0efec", height: "10%", textAlign: "center", display: "flex", gap: "30px", alignContent: "center", justifyContent: "center" }}>
                <a style={{ fontSize: "10px", fontWeight: "bold" }}>{username} {surname}</a>
                <a style={{ fontSize: "10px" }}>{expitedTime}</a>
            </div>
            <div style={{ height: "20%", display: "flex", justifyContent: "right", alignItems: "center" }}>
                {status === "RELEASED"
                    ? <CheckIcon style={{ color: "#d4d936", height: "15px", width: "15px", marginRight: "8px" }} />
                    : status === "SUSPENDED"
                    ? <XIcon style={{ color: "#c34f41", height: "15px", width: "15px", marginRight: "8px" }} />
                    : status === "ACTIVE" ? <CheckIcon style={{ color: "#41a23e", height: "15px", width: "15px", marginRight: "8px" }} />
                    : <QuestionIcon style={{ color: "#c34f41" }} />}
                <FillGearIcon style={{ width: "15px", marginRight: "5px", cursor: "pointer" }} onClick={toggleShowA} />
            </div>
            <Toast show={showA} onClose={toggleShowA}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Zastrzeż kartę</strong>

                </Toast.Header>
                <Toast.Body>
                    <Button onClick={cardSuspend} variant='danger'>Zastrzeż <XIcon color='black' style={{ margin: "3px" }}  /></Button>
                </Toast.Body>
            </Toast>
        </div>

    </>)
}