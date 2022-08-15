import React from "react";
import PropTypes from "prop-types";

import "./dropdown.css";

function Dropdown({ options, handleDropdown, selected }) {
  return (
    <div>
      <select value={selected} onChange={(e) => handleDropdown(e)}>
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

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      customerName: PropTypes.string.isRequired,
    })
  ),
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  handleDropdown: PropTypes.func.isRequired,
};
