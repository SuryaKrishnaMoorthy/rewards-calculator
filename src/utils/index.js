const POINT_ONE = 1;
const POINT_TWO = 2;

export const Months = Object.freeze({
  0: "january",
  1: "february",
  2: "march",
  3: "april",
  4: "may",
  5: "june",
  6: "july",
  7: "august",
  8: "september",
  9: "october",
  10: "november",
  11: "december",
});

/**
  Calculate rewards for a customer for 3 monthsjanuary, february, march
 */
export const calculateMonthlyRewards = (transactions, firstMonth) => {
  let month;
  if (!firstMonth) {
    month = 0;
  } else {
    month = parseInt(firstMonth);
  }
  let first = month % 12,
    second = (month + 1) % 12,
    third = (month + 2) % 12;
  /*
    To make rewards object to get data in below format
    {
      january: 100,
      february: 300,
      march: 200
    }
    */
  let rewards = {
    [Months[first]]: 0,
    [Months[second]]: 0,
    [Months[third]]: 0,
  };

  const monthlyRewards =
    transactions &&
    transactions.reduce((acc, { date, amount }) => {
      const month = new Date(date).getMonth();

      if (month === first) {
        acc[Months[first]] += rewardsForSingleTransaction(amount);
      } else if (month === second) {
        acc[Months[second]] += rewardsForSingleTransaction(amount);
      } else if (month === third) {
        acc[Months[third]] += rewardsForSingleTransaction(amount);
      }

      return acc;
    }, rewards);

  return monthlyRewards;
};

/**
  calculate rewards for 1 transaction
 */
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
