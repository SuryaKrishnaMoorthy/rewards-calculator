import React from "react";
import PropTypes from "prop-types";

import "./dropdown.css";

const Dropdown = ({ options, handleDropdown, selected, placeholder }) => {
  return (
    <div>
      <select value={selected} onChange={(e) => handleDropdown(e)}>
        <option value="">{placeholder}</option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  handleDropdown: PropTypes.func.isRequired,
};
