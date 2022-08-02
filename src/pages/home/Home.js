import React, { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import RewardsTable from "../../components/table/RewardsTable";
import { DATA } from "../../data";
import { getTableData } from "../../utils";
import "./home.css";

function Home() {
  const [selected, setSelected] = useState(DATA[0].id);
  const [rewards, setRewards] = useState({});

  useEffect(() => {
    const selectedCustomer = DATA.filter(
      (customer) => customer.id === parseInt(selected)
    );
    const rewards = getTableData(selectedCustomer[0].transactions);
    setRewards(rewards);
  }, [selected]);

  const handleDropdown = (e) => {
    setSelected(e.target.value);
  };

  
  return (
    <main className="home">
      <section className="dropdown-section">
        <Dropdown
          options={DATA}
          handleDropdown={handleDropdown}
          selected={selected}
        />
      </section>
      <section>
        <RewardsTable 
          rewards={rewards}
        />
      </section>
    </main>
  );
}

export default Home;
