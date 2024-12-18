import React, { useState } from "react";

interface SwitchProps {
  isChecked?: boolean; // Initial state of the switch
  onChange?: (checked: boolean) => void; // Callback when toggled
}

const Switch: React.FC<SwitchProps> = ({ isChecked = false, onChange }) => {
  const [checked, setChecked] = useState(isChecked);

  const handleToggle = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked); // Notify parent component of the change
    }
  };

  return (
    <div
      className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition ${
        checked ? "bg-orange-500" : "bg-[#252525]"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`h-5 w-5 bg-white rounded-full shadow-md transform transition ${
          checked ? "translate-x-7" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default Switch;
