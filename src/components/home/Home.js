import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import "./home.css";

const Home = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Documents");
  console.log(selectedMenuItem);
  return (
    <div className="home">
      <Header />
      <div className="main">
        <Sidebar
          selectedMenuItem={selectedMenuItem}
          setSelectedMenuItem={setSelectedMenuItem}
        />
        <Dashboard folder={selectedMenuItem} />
      </div>
    </div>
  );
};

export default Home;
