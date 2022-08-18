import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import RewardsTable from "../../components/table/RewardsTable";
import Loading from "../../components/loading/Loading";
import { calculateMonthlyRewards, Months } from "../../utils";
import "./home.css";

/** Change Months to dropdown format */
const months = Object.values(Months).map((month, index) => ({
  id: index,
  label: month,
}));

function Home() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransLoading, setIsTransLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [rewards, setRewards] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:3001/customers");
        const customerDropdownData = res.data.map(({ id, customerName }) => ({
          id,
          label: customerName,
        }));
        setCustomers(customerDropdownData);
        setError(null);
      } catch (error) {
        setIsLoading(false);
        setCustomers([]);
        console.log(error.message);
        setError("Something went wrong!");
        setCustomers([]);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getCustomerTransactions = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:3001/transactions/?customerId=${selectedCustomer}`
        );
        setTransactions(res.data);
        setIsLoading(false);
        const rewards = calculateMonthlyRewards(res.data, selectedMonth);
        setRewards(rewards);
      } catch (error) {
        setIsLoading(false);
        setTransactions([]);
        console.log(error.message);
        setError("Something went wrong!");
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedCustomer) {
      getCustomerTransactions();
    }
  }, [selectedCustomer]);

  useEffect(() => {
    const rewards = calculateMonthlyRewards(transactions, selectedMonth);
    setRewards(rewards);
  }, [selectedMonth]);

  const handleCustomer = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const rewardsTable = () => {
    if (error) {
      return <p style={{ textAlign: "center", color: "salmon" }}>{error}</p>;
    } else if (isLoading) {
      return <Loading />;
    } else if (selectedCustomer && rewards) {
      return <RewardsTable rewards={rewards} />;
    }
  };

  return (
    <main className="home">
      <section className="dropdown-section">
        <Dropdown
          options={customers}
          handleDropdown={handleCustomer}
          selected={selectedCustomer}
          placeholder="Select a customer"
        />
        {selectedCustomer && (
          <Dropdown
            options={months}
            handleDropdown={handleMonth}
            selected={selectedMonth}
            placeholder="Select a Month"
          />
        )}
      </section>

      <section>
        {selectedCustomer && rewards && <RewardsTable rewards={rewards} />}
      </section>
      {isLoading && <Loading />}
      {error && <p style={{ textAlign: "center", color: "salmon" }}>{error}</p>}
    </main>
  );
}

export default Home;
