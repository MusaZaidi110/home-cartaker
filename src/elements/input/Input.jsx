import React from 'react';
import "./Input.css";

const Input = ({ type, name, placeholder, value, onChange, error }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      type={type || "text"}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={handleChange}
      className={error ? "input-error" : ""}
    />
  );
};

export default Input;