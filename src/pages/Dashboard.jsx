import React from "react";

import Header from "../components/Header";
import Sections from "../components/Sections";
import FilterBar from "../components/FilterBar";
import DataTable from "../components/DataTable";
import AddProduct from "../components/AddProduct";

const Dashboard = () => {
  return (
   
      <div className="overflow-y-hidden ">
        <Header />
        <Sections />
        <FilterBar />
        <div className="max-h-[55vh]  w-full overflow-x-auto mt-82">
          <DataTable />
          <AddProduct/>
        </div>
      </div>
  );
};

export default Dashboard;
