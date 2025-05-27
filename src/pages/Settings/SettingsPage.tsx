import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import "./settings-page.css";
import PersonalSettings from './panels/PersonalSettings/PersonalSettings';
import NotificationSettings from "./panels/NotificationSettings/NotificationSettings";
import { defaultUser } from "../../data/defaultUser";

const SettingsPage: React.FC = () => {

    const DEFAULT_USER = defaultUser;

    const LOCAL_STORAGE_KEY = "user";

    const [user, setUser] = useState(DEFAULT_USER);
    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) setUser(JSON.parse(stored));
        else localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
    }, []);

    const handleSave = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
        console.log("User saved!", user);
    };


    const sections = [
        { id: "personal", label: "Personal Information", description: "Lorem ipsum dolor sit amet consectetur adipiscing." },
        { id: "notifications", label: "Notifications", description: "Lorem ipsum dolor sit amet consectetur adipiscing." },
    ];

    const [activeSection, setActiveSection] = useState<string>("personal");

    const renderPanel = () => {
        switch (activeSection) {
            case "personal":
                return (
                    <PersonalSettings user={user} setUser={setUser} />
                );
            case "notifications":
                return (
                    <NotificationSettings />
                );
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <div className="sub-container-settings">
                <div className="heading-settings">
                    <span className="title">Settings</span>
                    <Button onClick={handleSave}>Save</Button>
                </div>
                <div className="settings-body">
                    <aside className="settings-sidebar">
                        {sections.map(section => (
                            <div
                                key={section.id}
                                className={`settings-item ${activeSection === section.id ? "active" : ""
                                    }`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                {section.label}
                            </div>
                        ))}
                    </aside>
                    <main className="settings-panel">
                        {renderPanel()}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;