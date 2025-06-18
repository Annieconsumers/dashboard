import Header from "../../components/Header"
import StoreOrderRequestTable from "../../components/table/StoreOrderRequestTable"


const StoreOrderRequest = () => {
  return (
    
    <div className="overflow-y-hidden">
      <Header />
      <div className=" overflow-y-auto w-full h-full mt-20">
        <StoreOrderRequestTable /> 
      </div>
    </div>
  )
}

export default StoreOrderRequest