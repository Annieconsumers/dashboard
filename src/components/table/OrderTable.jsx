import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMartOrders,
  getRestaurantOrders,
  getSalonOrders,
} from "../../redux/slices/orderSlice";
import DataTable from "react-data-table-component";
import moment from "moment";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdDocument } from "react-icons/io";
import OrderDetailsModal from "../preview/OrderDetailsModal ";
import Invoice from "../preview/Invoice";

const productTypes = [
  { key: "mart_products", label: "Mart" },
  { key: "restaurant_products", label: "Restaurant" },
  { key: "salon_services", label: "Salon" },
  { key: "gym_services", label: "Gym" },
];

const OrderTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const dispatch = useDispatch();
  const { martOrders, restaurantOrders, salonOrders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getMartOrders());
    dispatch(getRestaurantOrders());
    dispatch(getSalonOrders());
  }, [dispatch]);

  const combinedOrders = [
    ...(martOrders || []),
    ...(restaurantOrders || []),
    ...(salonOrders || []),
  ];

  const extractProduct = (item) => {
    for (const { key, label } of productTypes) {
      if (item[key]) {
        return {
          name: item[key]?.name ?? "N/A",
          price: item[key]?.price ?? 0,
          discount_percentage: item[key]?.discount_percentage ?? 0,
          discounted_price: item[key]?.discounted_price ?? item[key]?.price ?? 0,
          total_gst: item[key]?.gst ?? 0,
          cgst_percente: (item[key]?.gst ?? 0) / 2,
          sgst_percente: (item[key]?.gst ?? 0) / 2,
          segment: label,
        };
      }
    }
    return {
      name: "N/A",
      price: 0,
      discount_percentage: 0,
      discounted_price: 0,
      segment: "Unknown",
    };
  };

  const handleShowOrders = (item) => {
    setSelectedOrder(item.orders);
    setShowOrderModal(true);
  };

  const handleInvoiceView = (clickedItem) => {
    const orderId = clickedItem.order_id;
    const orderItems = combinedOrders.filter((i) => i.order_id === orderId);

    const productDetails = orderItems.map((orderItem) => {
      for (const { key, label } of productTypes) {
        const product = orderItem[key];
        if (product) {
          const quantity = orderItem.quantity || 1;
          const price = product.price ?? 0;
          const discountedPrice = product.discounted_price ?? price;
          const cgst = product.cgst ?? (product.gst ?? 0) / 2;
          const sgst = product.sgst ?? (product.gst ?? 0) / 2;
          const total_price = product.final_price * quantity;
          const taxable = discountedPrice * quantity;
          const cgstInr = (cgst / 100) * taxable;
          const sgstInr = (sgst / 100) * taxable;

          return {
            product_name: product.name ?? "Unnamed Product",
            quantity,
            price,
            taxable,
            total_price,
            cgst_percent: cgst,
            sgst_percent: sgst,
            cgst_inr: cgstInr,
            sgst_inr: sgstInr,
            segment: label,
          };
        }
      }
      return null;
    }).filter(Boolean);

    const total = productDetails.reduce(
      (acc, item) => acc + item.taxable + item.cgst_inr + item.sgst_inr,
      0
    );

    const finalInvoice = {
      ...clickedItem.orders,
      gst_details: productDetails,
      total_amount: total.toFixed(2),
    };

    setSelectedOrder(finalInvoice);
    setShowInvoice(true);
  };

  const searchedOrders = combinedOrders.filter((item) => {
    const sellerName = item.orders?.sellers?.seller_name?.toLowerCase() || "";
    const userName = item.orders?.users?.name?.toLowerCase() || "";
    const orderId = item.orders?.id?.toLowerCase() || "";
    const segment = item.orders?.order_type?.toLowerCase() || "";
    const phone = item.orders?.users?.phone_number || "";

    const query = searchQuery.toLowerCase();

    return (
      sellerName.includes(query) ||
      userName.includes(query) ||
      orderId.includes(query) ||
      segment.includes(query) ||
      phone.includes(searchQuery)
    );
  });

  const data = searchedOrders.map((item, index) => {
    const product = extractProduct(item);
    return {
      serialNo: index + 1,
      order_id: item.orders.id,
      seller_name: item.orders.sellers?.seller_name ?? "N/A",
      user_name: item.orders.users?.name ?? "N/A",
      user_contact: item.orders.users?.phone_number ?? "N/A",
      sagment: product.segment,
      product_name: product.name,
      price: product.price,
      discount_percantage: product.discount_percentage,
      discounted_price: product.discounted_price,
      total_amount: item.total_amount,
      payment_status: item.orders.payment_status,
      order_status: item.orders.order_status,
      payment_method: item.orders.payment_method,
      address: item.orders.address,
      placed_at: moment(item.orders.placed_at).format("lll"),
      updated_at: moment(item.orders.updated_at).format("lll"),
      invoice: (
        <div className="inline-flex items-center text-white justify-center gap-1 w-full">
          <button
            onClick={() => handleShowOrders(item)}
            className="bg-green-600 cursor-pointer text-3xl rounded-md p-1"
          >
            <IoEyeOutline />
          </button>
          <button
            type="button"
            onClick={() => handleInvoiceView(item)}
            className="bg-blue-500 cursor-pointer text-3xl rounded-md p-1"
          >
            <IoMdDocument />
          </button>
        </div>
      ),
    };
  });

  const columns = [
    { name: "S.no", selector: (row) => row.serialNo },
    { name: "Order Id", selector: (row) => row.order_id },
    { name: "Seller name", selector: (row) => row.seller_name },
    { name: "User Name", selector: (row) => row.user_name },
    { name: "User Contact", selector: (row) => row.user_contact },
    { name: "Segment", selector: (row) => row.sagment },
    { name: "Product Name", selector: (row) => row.product_name },
    { name: "Price (₹)", selector: (row) => row.price },
    { name: "Discount(%)", selector: (row) => row.discount_percantage },
    { name: "Discounted Price (₹)", selector: (row) => row.discounted_price },
    { name: "Payment Status", selector: (row) => row.payment_status },
    { name: "Order Status", selector: (row) => row.order_status },
    { name: "Payment Method", selector: (row) => row.payment_method },
    { name: "Address", selector: (row) => row.address, width: "400px" },
    { name: "Placed", selector: (row) => row.placed_at, width: "170px" },
    { name: "Update", selector: (row) => row.updated_at, width: "170px" },
    { name: "Invoice", selector: (row) => row.invoice, width: "170px" },
  ];

  const customStyles = {
    headCells: {
      style: {
        borderBottom: "1px solid black",
        borderRight: "1px solid gray",
        backgroundColor: "#f4f4f4",
        fontWeight: "bold",
        borderTop: "1px solid black",
        justifyContent: "center",
        fontSize: "15px",
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "gray",
          justifyContent: "center",
          fontSize: "15px",
        },
      },
    },
  };

  return (
    <div className="overflow-y-auto">
      <div className="m-5 p-2 flex text-sm font-semibold sticky top-0 z-10 gap-2">
        {/* <label className="flex-col flex font-semibold ml-5">
          Placed Date
          <input
            className="border-2 border-gray-400 rounded-full h-10 w-50 p-3"
            type="date"
          />
        </label>
        <div>
          <label className="flex-col font-semibold flex ml-5">
            Order Status
            <select className="border-2 border-gray-400 rounded-full h-10 w-50 p-2">
              <option>All Order</option>
              <option>Payment Pending</option>
              <option>Received</option>
              <option>Processing</option>
              <option>Delivered</option>
              <option>Out for Delivery</option>
            </select>
          </label>
        </div> */}
        <label className="flex-col font-semibold flex ml-5">
          Search By Name
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-gray-400 w-95 h-10 rounded-full p-3"
            placeholder="Search"
            type="text"
          />
        </label>
      </div>

      <div className="max-h-[74vh] max-w-[80vw]">
        <DataTable
          fixedHeader
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          defaultSortFieldId={1}
        />
      </div>

      <OrderDetailsModal
        show={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        order={selectedOrder}
        combinedOrders={combinedOrders}
      />

      <Invoice
        show={showInvoice}
        onClose={() => setShowInvoice(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderTable;
