import React from "react";
import PropTypes from "prop-types";

import "./rewardsTable.css";

function RewardsTable({ rewards }) {
  // Calculate total rewards for 3 months
  const total = Object.keys(rewards).reduce((acc, month) => {
    acc += rewards[month];
    return acc;
  }, 0);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>month</th>
            <th>rewards</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rewards).map((month, index) => (
            <tr key={index}>
              <th scope="row">{month}</th>
              <td>{rewards[month]}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Total</th>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RewardsTable;

RewardsTable.propTypes = {
  rewards: PropTypes.object.isRequired,
};
