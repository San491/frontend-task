import "./personal-settings.css";
import { useRef } from "react";
import { ReactComponent as UserIcon } from "../../../../assets/userIcon.svg";
import { ReactComponent as MailIcon } from "../../../../assets/mailIcon.svg";
import { ReactComponent as ImageIcon } from "../../../../assets/imageIcon.svg";
import { ReactComponent as PencilIcon } from "../../../../assets/pencilIcon.svg";
import { ReactComponent as UserPhotoIcon } from "../../../../assets/imageIcon.svg";
import Input from "../../../../components/Input/Input";

const DEFAULT_USER = {
    name: "John Carter",
    email: "john@dashdark.com",
    image: "",
    bio: ""
};

interface PersonalSettingsProps {
    user: {
        name: string;
        email: string;
        image: string;
        bio: string;
    };
    setUser: React.Dispatch<React.SetStateAction<typeof DEFAULT_USER>>;
}

const PersonalSettings: React.FC<PersonalSettingsProps> = ({ user, setUser }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setUser(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="panel-container">
            <div className="label-header">
                <span className="settings-label">Personal Information</span>
                <span className="settings-description">Lorem ipsum dolor sit amet consectetur adipiscing.</span>
            </div>
            <div className="settings-card">
                <div className="option-container">
                    <div className="option-name">
                        <UserIcon />
                        <span>Full name</span>
                    </div>
                    <Input
                        value={user.name}
                        onChange={e => setUser(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Carter"
                    />
                </div>
                <div className="option-container">
                    <div className="option-name">
                        <MailIcon />
                        <span>Email address</span>
                    </div>
                    <Input
                        value={user.email}
                        onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@dashdark.com"
                    />
                </div>
                <div className="option-container">
                    <div className="option-name">
                        <ImageIcon />
                        <span>Photo</span>
                    </div>
                    <div className="photo-upload">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="product-image user"
                            />
                        ) : (
                            <div className="no-photo user">
                                <div className="click-to-upload" onClick={() => fileInputRef.current?.click()}>
                                    <div className="upload-icon user">
                                        <UserPhotoIcon />
                                    </div>
                                    <span className="click-to-upload line-one">
                                        <span className="click-to-upload highlight">Click to upload </span>
                                        <span>or drag and drop</span>
                                    </span>
                                    <span> SVG, PNG, JPG or GIF (max. 800 x</span>
                                    <span>400px)</span>
                                </div>
                            </div>
                        )}
                        <input
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={fileInputRef}
                        />

                        {user.image && (
                            <div className="modal-edit-delete">
                                <span className="modal-edit" onClick={() => fileInputRef.current?.click()}>Edit</span>
                                <span>| </span>
                                <span
                                    className="modal-delete"
                                    onClick={() => setUser(prev => ({ ...prev, image: "" }))}
                                >
                                    Delete
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="option-container end">
                    <div className="option-name">
                        <PencilIcon />
                        <span>Short description</span>
                    </div>
                    <textarea
                        className="text-box"
                        placeholder="Write a short bio"
                        value={user.bio}
                        onChange={e => setUser(prev => ({ ...prev, bio: e.target.value }))}
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalSettings;
