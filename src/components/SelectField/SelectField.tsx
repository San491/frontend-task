import React, { useState, useRef, useEffect } from "react";
import "./select-field.css";

interface Option {
    label: string;
    value: string;
}

interface SelectFieldProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
    options,
    value,
    onChange,
    leftIcon,
    rightIcon,
    placeholder = "Select...",
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className="custom-select-container" ref={containerRef}>
            <div className="select-display" onClick={() => setOpen((prev) => !prev)}>
                {leftIcon && <span className="select-icon left-icon">{leftIcon}</span>}
                <span className="selected-value">
                    {selectedOption?.label || placeholder}
                </span>
                {rightIcon && <span className="select-icon right-icon">{rightIcon}</span>}
            </div>
            {open && (
                <div className="select-dropdown">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            className={`dropdown-option ${opt.value === value ? "selected" : ""
                                }`}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};