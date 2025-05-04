import React, { useState } from "react";
import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';



const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div
        className="select"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        {value || "Select an option"}
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
              role="button"
              tabIndex={0}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
