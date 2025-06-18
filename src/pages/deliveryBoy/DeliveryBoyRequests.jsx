
import DeliveryBoyRequestTable from "../../components/table/DeliveryBoyRequestTable";
import Header from "../../components/Header";


const DeliveryBoyRequests = () => {
  return (
   
      <div className="overflow-y-hidden">
        <Header />
        <div className=" overflow-y-auto w-full h-full mt-20">
          <DeliveryBoyRequestTable />
        </div>
      </div>
  );
};

export default DeliveryBoyRequests;
