import React from "react";
import Header from "../../components/Header";
import ManageHomeSliderTable from "../../components/table/ManageHomeSliderTable";

const ManageHomeSlider = () => {
  return (
    
      <div className="overflow-y-hidden">
        <Header />
        <div className=" overflow-y-auto w-full h-full mt-20">
          <ManageHomeSliderTable />
        </div>
      </div>
  );
};

export default ManageHomeSlider;
