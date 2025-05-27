import "./input.css";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ onChange, name, value, type, placeholder, ...props }) => {


    return (
        <div className="input-container">
            <input className="input"
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                {...props}
            />
        </div>
    )
}


export default Input;