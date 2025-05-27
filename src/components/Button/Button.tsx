import "./button.css"

type ButtonVariant = "primary" | "modal";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    ...props
}) => {
    return (
        <button className={variant == "primary" ? "button-primary" : "button-modal"} {...props}>
            {children}
        </button>
    )
}

export default Button;