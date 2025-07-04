import "./notification-settings.css";
import { ReactComponent as TooltipIcon } from "../../../../assets/tooltipIcon.svg"
import ToggleButtons from "../../../../components/ToggleButton/ToggleButton";

const NotificationSettings: React.FC = () => {
    return (
        <div className="panel-container">
            <div className="label-header">
                <span className="settings-label">General notifications</span>
                <span className="settings-description">Lorem ipsum dolor sit amet consectetur adipiscing.</span>
            </div>
            <div className="settings-card notif">
                <div className="option-container notif">
                    <div className="option-name">
                        <span>I'm mentioned in a message</span>
                        <div className="tooltip-wrapper">
                            <TooltipIcon />
                            <span className="tooltip-text">Lorem ipsum dolor sit amet consectetur adipiscing. Lorem ipsum dolor sit amet consectetur adipiscing.</span>
                        </div>
                    </div>
                    <ToggleButtons />
                </div>
                <div className="option-container notif">
                    <div className="option-name">
                        <span>Someone replies to any message</span>
                        <div className="tooltip-wrapper">
                            <TooltipIcon />
                            <span className="tooltip-text">Lorem ipsum dolor sit amet consectetur adipiscing. Lorem ipsum dolor sit amet consectetur adipiscing.</span>
                        </div>
                    </div>
                    <ToggleButtons />
                </div>
                <div className="option-container notif">
                    <div className="option-name">
                        <span>I’m assigned a task</span>
                        <div className="tooltip-wrapper">
                            <TooltipIcon />
                            <span className="tooltip-text">Lorem ipsum dolor sit amet consectetur adipiscing. Lorem ipsum dolor sit amet consectetur adipiscing.</span>
                        </div>
                    </div>
                    <ToggleButtons />
                </div>
                <div className="option-container notif">
                    <div className="option-name">
                        <span>A task is overdue</span>
                        <div className="tooltip-wrapper">
                            <TooltipIcon />
                            <span className="tooltip-text">Lorem ipsum dolor sit amet consectetur adipiscing. Lorem ipsum dolor sit amet consectetur adipiscing.</span>
                        </div>
                    </div>
                    <ToggleButtons />
                </div>
            </div>
            <div className="label-header">
                <span className="settings-label">Summary notifications</span>
                <span className="settings-description">Lorem ipsum dolor sit amet consectetur adipiscing.</span>
            </div>
            <div className="settings-card notif">
                <div className="option-container notif">
                    <div className="option-name">
                        <span>Daily summary</span>
                        <div className="tooltip-wrapper">
                            <TooltipIcon />
                            <span className="tooltip-text">Lorem ipsum dolor sit amet consectetur adipiscing. Lorem ipsum dolor sit amet consectetur adipiscing.</span>
                        </div>
                    </div>
                    <ToggleButtons />
                </div>
                <div className="option-container notif">
                    <div className="option-name">
                        <span>Weekly summary</span>
                        <div className="tooltip-wrapper">
                            <TooltipIcon />
                            <span className="tooltip-text">Lorem ipsum dolor sit amet consectetur adipiscing. Lorem ipsum dolor sit amet consectetur adipiscing.</span>
                        </div>
                    </div>
                    <ToggleButtons />
                </div>
                <div className="option-container notif">
                    <div className="option-name">
                        <span>Monthly summary</span>
                        <div className="tooltip-wrapper">
                            <TooltipIcon />
                            <span className="tooltip-text">Lorem ipsum dolor sit amet consectetur adipiscing. Lorem ipsum dolor sit amet consectetur adipiscing.</span>
                        </div>
                    </div>
                    <ToggleButtons />
                </div>
                <div className="option-container notif">
                    <div className="option-name">
                        <span>Yearly summary</span>
                        <div className="tooltip-wrapper">
                            <TooltipIcon />
                            <span className="tooltip-text">Lorem ipsum dolor sit amet consectetur adipiscing. Lorem ipsum dolor sit amet consectetur adipiscing.</span>
                        </div>
                    </div>
                    <ToggleButtons />
                </div>
            </div>
        </div>
    )
}

export default NotificationSettings;