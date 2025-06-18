
import Header from '../components/Header'
import StockTable from '../components/table/StockTable';

const StockManagement = () => {
  return (

    <div className=" overflow-y-hidden ">
      <Header />
      <div className=" overflow-y-auto w-full h-full mt-20">
        <StockTable/> 
      </div>
    </div>
  )
}

export default StockManagement