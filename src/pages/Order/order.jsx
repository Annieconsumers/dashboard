import Header from "../../components/Header"
import OrderTable from "../../components/table/OrderTable"


const order = () => {
  return (
    
    <div className=" overflow-y-hidden ">
      <Header />
      <div className=" overflow-y-auto w-full h-full mt-20">
        <OrderTable/> 
      </div>
    </div>
  )
}

export default order


