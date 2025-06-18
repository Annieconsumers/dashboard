import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { FaFileDownload } from "react-icons/fa";

const Invoice = ({ show, onClose, order }) => {
  const invoiceRef = useRef();

  if (!show || !order) return null;

  const {
    id,
    placed_at,
    users,
    sellers,
    address,
    payment_method,
    payment_status,
    gst_details = [],
    total_amount,
  } = order;

  const handleDownload = () => {
    const element = invoiceRef.current;
    if (!element) return;

    const options = {
      margin: 0.5,
      filename: `invoice_${id || "order"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "8px",
        }}
      >
        {/* Invoice */}
        <div
          ref={invoiceRef}
          style={{
            width: "690px",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "white",
            color: "#000",
            border: "1px solid #ccc",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
              textDecoration: "underline",
              marginBottom: "20px",
            }}
          >
            INVOICE
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <h4 style={{ fontWeight: "bold" }}>Seller</h4>
              <p>{sellers?.seller_name}</p>
              <p>
                {sellers?.address_line_1} {sellers?.store_city}{" "}
                {sellers?.store_state} {sellers?.store_postal_code}
              </p>
              <p style={{textTransform:"uppercase"}}>GSTIN: {sellers?.gst_number || "N/A"}</p>
            </div>
            <div>
              <h4 style={{ fontWeight: "bold" }}>Buyer</h4>
              <p>{users?.name}</p>
              <p>{address}</p>
              <p>+{users.phone_number}</p>
            </div>
          </div>

          <p>
            <strong>Order ID:</strong> {id}
          </p>
          <p>
            <strong>Date:</strong> {placed_at}
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
              marginTop: "20px",
              border: "1px solid #ccc",
            }}
          >
            <thead style={{ backgroundColor: "#e5e7eb" }}>
              <tr
                style={{
                  borderCollapse: "collapse",
                  border: "1px solid #ccc",
                }}
              >
                
                <th style={{width:"100px", paddingBottom:"10px"}} >Product</th>
                <th style={{width:"10px", paddingBottom:"10px"}}>Qty</th>
                <th style={{width:"100px", paddingBottom:"10px"}}>Price</th>
                <th style={{width:"100px", paddingBottom:"10px"}}>Taxable</th>
                <th style={{width:"10px", paddingBottom:"10px"}}>Tax</th>
                <th style={{width:"100px", paddingBottom:"10px"}}>CGST (%)</th>
                <th style={{width:"100px", paddingBottom:"10px"}}>CGST (₹)</th>
                <th style={{width:"100px", paddingBottom:"10px"}}>SGST (%)</th>
                <th style={{width:"100px", paddingBottom:"10px"}}>SGST (₹)</th>
                <th style={{width:"100px", paddingBottom:"10px"}}>Total (₹)</th>

              </tr>
            </thead>
            <tbody>
              {gst_details.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    textAlign: "center",
                    borderCollapse: "collapse",
                    border: "1px solid #ccc",
                  }}
                >
                  <td style={{paddingBottom:"10px"}}>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.taxable.toFixed(2)}</td>
                  <td>{item.cgst_percent * 2}%</td>
                  <td>{item.cgst_percent}%</td>
                  <td>₹{item.cgst_inr.toFixed(2)}</td>
                  <td>{item.sgst_percent}%</td>
                  <td>₹{item.sgst_inr.toFixed(2)}</td>
                  <td>₹{item.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{ marginTop: "20px", textAlign: "right", fontSize: "14px" }}
          >
            <p>
              Payment Method: <strong>{payment_method?.toUpperCase()}</strong>
            </p>
            <p>
              Payment Status: <strong>{payment_status?.toUpperCase()}</strong>
            </p>
            <h3 style={{ marginTop: "10px", fontWeight: "bold" }}>
              Total: ₹{total_amount}
            </h3>
          </div>

          <p
            style={{
              marginTop: "30px",
              textAlign: "center",
              fontSize: "12px",
              color: "#666",
            }}
          >
            This is a system-generated invoice and does not require a signature.
          </p>
        </div>

        {/* Buttons */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "10px 16px",
              borderRadius: "5px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FaFileDownload />
            Download Invoice
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              padding: "10px 16px",
              borderRadius: "5px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
