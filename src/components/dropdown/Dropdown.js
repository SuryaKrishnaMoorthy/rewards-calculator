import React from "react";
import "./dropdown.css";

function Dropdown({ options, handleDropdown, selected }) {
  return (
    <div>
      <select
        value={selected}
        onChange={(e) => handleDropdown(e)}
      >
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.customerName}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Dropdown;
