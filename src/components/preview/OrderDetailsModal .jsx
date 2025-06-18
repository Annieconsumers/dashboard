const OrderDetailsModal = ({ show, onClose, order, combinedOrders }) => {
  if (!show || !order) return null;

  console.log(order);
  

  const extractProduct = (item) => {
    console.log(item);
    
    const productTypes = [
      { key: "mart_products", label: "mart" },
      { key: "restaurant_products", label: "restaurant" },
      { key: "salon_services", label: "salon" },
    ];

    for (const { key, label } of productTypes) {
      if (item[key]) {
        return {
          name: item[key]?.name ?? "N/A",
          price: item[key]?.price ?? 0,
          discount_percentage: item[key]?.discount_percentage ?? 0,
          discounted_price: item[key]?.discounted_price ?? 0,
          cgst: item[key]?.cgst ?? 0,  
          sgst: item[key]?.sgst ?? 0,  
          tax_amount: item[key]?.tax_amount ?? 0,  
          final_price: item[key]?.final_price ?? 0,
          segment: label,
        };
      }
    }

    return {
      name: "N/A",
      price: 0,
      discount_percentage: 0,
      discounted_price: 0,
      final_price: 0,
      segment: "unknown",
    };
  };

  const relatedItems = combinedOrders.filter((entry) => entry.orders?.id === order?.id);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[80%] max-h-[80vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-4">Order Details: {order.id}</h2>
        <div className="mb-2">
          <p><strong>User:</strong> {order.users?.name} ({order.users?.phone_number})</p>
          <p><strong>Seller:</strong> {order.sellers?.seller_name}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Status:</strong> {order.order_status}</p>
        </div>

        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Discount (%)</th>
              <th className="border p-2">Discounted Price</th>
              <th className="border p-2">GST</th>
              <th className="border p-2">CGST INR</th>
              <th className="border p-2">SGST InR</th>
              <th className="border p-2">Total InR</th>

            </tr>
          </thead>
          <tbody>
            {relatedItems.map((item, index) => {
              const product = extractProduct(item);
              return (
                <tr key={index}>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">₹{product.price}</td>
                  <td className="border p-2">{product.discount_percentage}%</td>
                  <td className="border p-2">₹{product.discounted_price}</td>
                  <td className="border p-2">{product.cgst + product.sgst }%</td>
                  <td className="border p-2">₹{product.tax_amount/2 }</td>
                  <td className="border p-2">₹{product.tax_amount/2 }</td>
                  <td className="border p-2">₹{product.final_price * item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
            style={{ marginTop: "20px", textAlign: "right", fontSize: "14px" }}
          >
            <p>
              Payment Method: <strong>{order.payment_method?.toUpperCase()}</strong>
            </p>
            <p>
              Payment Status: <strong>{order.payment_status?.toUpperCase()}</strong>
            </p>
            <h3 style={{ marginTop: "10px", fontWeight: "bold" }}>
              Total: ₹{order.total_amount}
            </h3>
          </div>

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
