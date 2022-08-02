export const POINT_ONE = 1;
export const POINT_TWO = 2;
export const monthIndex = {
  january: "01",
  february: "02",
  march: "03",
};

export const getTableData = (transactions) => {
    const rewards = calculateMonthlyRewards(transactions)
    const rewardsArr =  Object.keys(rewards);
    return Object.keys(monthIndex).reduce((acc, month, index) => {
      acc[month] = rewards[rewardsArr[index]];
      return acc
    },{})
}

export const calculateMonthlyRewards = (transactions) => {
  let rewards = {
    firstMonthRewards: 0,
    secondMonthRewards: 0,
    thirdMonthRewards: 0,
  };

  const monthlyRewards =
    transactions &&
    transactions.reduce((acc, { date, amount }) => {
      const month = date.substring(0, 2);
      const { january, february, march } = monthIndex;

      if (month === january) {
        acc.firstMonthRewards += rewardsForSingleTransaction(amount);
      } else if (month === february) {
        acc.secondMonthRewards += rewardsForSingleTransaction(amount);
      } else if (month === march) {
        acc.thirdMonthRewards += rewardsForSingleTransaction(amount);
      }

      return acc;
    }, rewards);

  return monthlyRewards;
};

const rewardsForSingleTransaction = (amount) => {
  let points = 0,
    purchased = amount;

  if (purchased > 100) {
    points += (purchased - 100) * POINT_TWO + 50 * POINT_ONE;
  } else if (50 < purchased && purchased <= 100) {
    points += (purchased - 50) * POINT_ONE;
  }
  return points;
};
