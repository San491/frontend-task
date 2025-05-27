import React, { useState } from 'react';
import './custom-checkbox.css';

interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label className="custom-checkbox-wrapper">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="custom-checkbox-input"
      />
      <span className="custom-checkbox-box" />
    </label>
  );
};

export default CustomCheckbox;