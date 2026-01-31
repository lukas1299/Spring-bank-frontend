import mc from './img/mc.png';
import chip from './img/chip.jpeg';

import { ReactComponent as FillGearIcon } from './icons/gear-fill.svg';

export default function Card({cardNumber, expitedTime, username, surname}) {
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
                <a style={{ fontWeight: "bold" }}>{cardNumber}</a>
            </div>
            <div style={{ backgroundColor: "#f0efec", height: "10%", textAlign: "center", display: "flex", gap: "30px", alignContent: "center", justifyContent: "center" }}>
                <a style={{ fontSize: "10px", fontWeight: "bold" }}>{username} {surname}</a>
                <a style={{ fontSize: "10px" }}>{expitedTime}</a>
            </div>
            <div style={{ height: "20%", display: "flex", justifyContent: "right", alignItems: "center" }}>
                <FillGearIcon style={{ width: "12px", marginRight: "5px", cursor: "pointer" }} />
            </div>
        </div>

    </>)
}