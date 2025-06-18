import CategoryContainer from "../components/CategoryContainer";
import DeliveryBoyContainer from "../components/DeliveryBoyContainer";
import EmployeeContainer from "../components/EmployeeContainer";
import Header from "../components/Header";
import OrderContainer from "../components/OrderContainer";
import ProductContainer from "../components/ProductContainer";
import SellerContainer from "../components/SellerContainer";


const Home = () => {
  return (
    <div>
      <div className="z-20">
        <Header />
      </div>
      <div className="mt-20 p-5 gap-5 flex flex-col bg-gray-100">
        <ProductContainer />
        <CategoryContainer />
        <OrderContainer />
        <SellerContainer />
        <EmployeeContainer />
        <DeliveryBoyContainer />
      </div>
    </div>
  );
};

export default Home;
