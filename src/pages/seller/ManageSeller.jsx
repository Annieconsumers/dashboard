import Header from "../../components/Header";
import ManageSellerTable from "../../components/table/ManageSellerTable"


const ManageSeller = () => {
  return (
    
      <div className="overflow-y-hidden">
        <Header />
        <div className=" overflow-y-auto w-full h-full mt-20">
          <ManageSellerTable />
        </div>
      </div>
  );
};

export default ManageSeller;
