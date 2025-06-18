import { Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import CreateEmployee from "../pages/employee/CreateEmployee";
import EmployeeRequestTable from "../pages/employee/EmployeeRequestTable";
import ManageEmployeeTable from "../pages/employee/ManageEmployeeTable";
import GymProductTable from "../components/table/GymProductTable";
import GymNutritionTable from "../components/table/GymNutritionTable";
import GymWorkoutTable from "../components/table/GymWorkoutTable";
import Home from "../pages/Home";
import AddHomeSlider from "../pages/homeSlider/AddHomeSlider";
import Dashboard from "../pages/Dashboard";
import ProductManagement from "../pages/ProductManagement";
import StockManagement from "../pages/StockManagement";
import TicketList from "../pages/TicketList";
import Subscription from "../pages/Subscription";
import Order from "../pages/Order/order";
import AddSellerPage from "../pages/seller/AddSellerPage";
import NewRegisteredSeller from "../pages/seller/NewRegisteredSeller";
import ManageSeller from "../pages/seller/ManageSeller";
import SellerPrivacyPage from "../pages/seller/SellerPrivacyPage";
import ManageHomeSlider from "../pages/homeSlider/ManageHomeSlider";
import CreateDeliveryBoy from "../pages/deliveryBoy/CreateDeliveryBoy";
import DeliveryBoyRequests from "../pages/deliveryBoy/DeliveryBoyRequests";
import StoreOrderRequest from "../pages/Order/StoreOrderRequest";
import ManageDeliveryBoys from "../pages/deliveryBoy/ManageDeliveryBoys";
import DeliveryBoyPolicy from "../pages/deliveryBoy/DeliveryBoyPolicy";
import Customers from "../pages/Customers";
import SystemUser from "../pages/SystemUser";
import { useSelector } from 'react-redux';
import EmployeePolicy from '../pages/employee/EmployeePolicy';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[300px] overflow-x-hidden w-full">{children}</div> 
    </div>
  );
};

const AllRoutes = () => {
      const selectedSection = useSelector(
    (state) => state.category.selectedSection
  );
  return (
    <div>
              <Layout>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Dashboard />} />
          <Route path= {`${selectedSection}/${selectedSection === "gym" || selectedSection === "salon" ? "services" : "Products"}`} element={<ProductManagement />} />
          <Route path= {`${selectedSection}/nutrition`} element={<GymNutritionTable />}  key="nutrition"/>
          <Route path= {`${selectedSection}/workout`} element={<GymWorkoutTable />}  key="workout"/>
          <Route path= {`${selectedSection}/products`} element={<GymProductTable />}  key="products"/>
          <Route path="stock" element={<StockManagement />} />
          <Route path="feedback" element={<TicketList />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="order" element={<Order />} />
          <Route path="order/store-order-request" element={<StoreOrderRequest />} />
          <Route path="seller/add-Seller" element={<AddSellerPage />} />
          <Route path="seller/new-seller-request" element={<NewRegisteredSeller />} />
          <Route path="seller/manage-sellers" element={<ManageSeller />} />
          <Route path="seller/seller-privacy" element={<SellerPrivacyPage />} />
          <Route path="slider/add-home-slider" element={<AddHomeSlider />} />
          <Route path="slider/manage-home-slider" element={<ManageHomeSlider />} />
          <Route path="delivery-boy/create-delivery-boy" element={<CreateDeliveryBoy />} />
          <Route path="delivery-boy/delivery-boy-requests" element={<DeliveryBoyRequests />} />
          <Route path="delivery-boy/manage-delivery-boys" element={<ManageDeliveryBoys />} />
          {/* <Route path="delivery-boy/delivery-boys-cash" element={<DeliveryBoyCash />} /> */}
          <Route path="delivery-boy/delivery-boys-policy" element={<DeliveryBoyPolicy />} />
          <Route path="employee/create-employee" element={<CreateEmployee />} />
          <Route path="employee/employee-requests" element={<EmployeeRequestTable />} />
          <Route path="employee/manage-employees" element={<ManageEmployeeTable />} />
          <Route path='employee/employees-policy' element={<EmployeePolicy />} />
          <Route path="customer" element={<Customers />} />
          <Route path="system-user" element={<SystemUser />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default AllRoutes