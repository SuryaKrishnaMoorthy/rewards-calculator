import React from "react";

function Dropdown({ options, onChange }) {
  return (
    <div>
      <select value={options[0].customerName} onChange={onChange}>
        {options.map(({ id, customerName }) => (
          <option key={id} value={id}>
            {customerName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
