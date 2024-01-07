import React from "react";

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isDarkMode} onChange={onToggle} />
      <span className="slider round"></span>
    </label>
  );
};

export default DarkModeToggle;
