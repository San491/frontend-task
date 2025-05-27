import { useState } from "react";
import "./toggle-button.css";
import {ReactComponent as DeviceNotifIcon} from "../../assets/deviceNotifIcon.svg"
import {ReactComponent as EmailNotifIcon} from "../../assets/emailNotifIcon.svg"


const ToggleButtons = () => {
    const [selected, setSelected] = useState("in-app");

    return (
        <div className="toggle-container">
            <div
                className={`toggle-btn-left ${selected === "in-app" ? "active" : ""}`}
                onClick={() => setSelected("in-app")}
            >
                <DeviceNotifIcon/>
                In-app
            </div>
            <div
                className={`toggle-btn-right ${selected === "email" ? "active" : ""}`}
                onClick={() => setSelected("email")}
            >
                <EmailNotifIcon/>
                Email
            </div>
        </div>
    );
};

export default ToggleButtons;