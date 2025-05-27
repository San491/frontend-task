import { useEffect, useState } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import BrandIcon from "../../assets/brandLogo.png";
import ArrowRightIcon from "../../assets/chevronRight.png";
import UserImg from "../../assets/userImg.png";
import { ReactComponent as DashboardIcon } from "../../assets/home.svg";
import { ReactComponent as ProductListIcon } from "../../assets/productListIcon.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settingsIcon.svg";


const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        { icon: <DashboardIcon />, label: "Dashboard", path: "/" },
        { icon: <ProductListIcon />, label: "Product List", path: "/products" },
        { icon: <SettingsIcon />, label: "Settings", path: "/settings" },
    ];

    const [userImage, setUserImage] = useState(UserImg);
    const [userName, setUserName] = useState("John Carter");
    const [showText, setShowText] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser.image) setUserImage(parsedUser.image);
                if (parsedUser.name) setUserName(parsedUser.name);
            } catch (err) {
                console.error("Error parsing user from localStorage:", err);
            }
        }
    }, []);


    useEffect(() => {
        if (isCollapsed) {
            setShowText(false);
        } else {
            const timeout = setTimeout(() => setShowText(true), 300); // match sidebar transition duration
            return () => clearTimeout(timeout);
        }
    }, [isCollapsed]);

    return (
        <div className={isCollapsed ? "sidebar collapsed" : "sidebar"}>
            <div className="above">
                <div className="top">
                    <div className="brand">
                        <img src={BrandIcon} alt="Logo" />
                        {!showText ? <></> : <span className="logo">Dashdark X</span>}
                    </div>
                    <div className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? <img src={ArrowRightIcon} alt="Toggle Nav" />
                            : <img src={ArrowRightIcon} alt="Toggle Nav" style={{ transform: 'rotate(180deg)' }} />}
                    </div>
                </div>
                <div className="middle">
                    <ul className="nav-list">
                        {navItems.map((item, index) => (
                            <li key={index} className="nav-item">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                >
                                    <div className="item-sidebar">
                                        <span className="icon-sidebar">{item.icon}</span>
                                        {!showText ? "" : <span className="label">{item.label}</span>}
                                    </div>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
            <div className="below">
                <div className="profile">
                    <div className="user">
                        <div >
                            <img src={userImage} className="user-img" />
                        </div>
                        {!showText ? <></> : <span>{userName}</span>}
                    </div>

                    {!showText ? <></> :
                        <div className="arrow">
                            <img src={ArrowRightIcon} alt="Go to profile" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar;