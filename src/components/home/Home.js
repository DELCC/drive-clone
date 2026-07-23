import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import "./home.css";

const Home = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Documents");
  // Signal partagé : bumpé par le Dashboard après une opération Trash,
  // écouté par la Sidebar pour recalculer la jauge de stockage.
  const [storageVersion, setStorageVersion] = useState(0);
  return (
    <div className="home">
      <Header />
      <div className="main">
        <Sidebar
          selectedMenuItem={selectedMenuItem}
          setSelectedMenuItem={setSelectedMenuItem}
          storageVersion={storageVersion}
        />
        <Dashboard
          folder={selectedMenuItem}
          onStorageChange={() => setStorageVersion((v) => v + 1)}
        />
      </div>
    </div>
  );
};

export default Home;
