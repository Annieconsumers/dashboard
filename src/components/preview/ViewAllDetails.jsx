import Carousel from "../ui/Carousel";

const ViewAllDetails = ({ product, onClose }) => {
  const section = localStorage.getItem("selectedSection");
  console.log(section);

  console.log(product);
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] lg:w-[75vw] max-w-[1200px] bg-white rounded-xl shadow-lg z-50 overflow-auto">
      <div className="border-b border-gray-300 py-5 px-6 flex justify-between items-center">
        <h3 className="font-bold text-2xl">Product Details</h3>
        <button
          onClick={onClose}
          className="bg-red-500 p-2 rounded-lg text-white cursor-pointer"
        >
          Close
        </button>
      </div>

      <div className="overflow-y-auto max-h-[70vh] p-6 flex flex-col md:flex-row">
        {/* Left Table with product Details */}
        <div className="w-full md:w-1/2 pr-4">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">product Id</th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.id}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  product Name
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.name}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">Category</th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.categories.name}
                </td>
              </tr>
              {
                section === "mart" && 
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">Quantity</th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.stock_quantity}
                </td>
              </tr>
              }
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">HSN Code</th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.hsn_code}
                </td>
              </tr>

              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">Price (₹) </th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.price}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Discount percentage (%)
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.discount_percentage}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Discounted price (₹)
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.discounted_price}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Taxable Price (₹)
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.taxable_price}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">GST %</th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.gst}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  CGST INR ({product.gst / 2}%)
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.cgst_inr}
                </td>
              </tr>
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  SGST INR ({product.gst / 2}%)
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.sgst_inr}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Section with Images and Store Info */}
        <div className="w-full md:w-1/2 ">
          <div className="flex justify-center border border-gray-300  mb-4">
            <Carousel image={product.image_urls} />
          </div>
          <table className="w-full text-left">
            <tbody>
              {section === "mart" && (
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Benefits
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {" "}
                    {product?.benefits.map((list, index) => (
                      <p key={index}>
                        <span className="font-bold">{index + 1}.</span> {list}
                      </p>
                    ))}
                  </td>
                </tr>
              )}
              {section === "salon" && (
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Highlights
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {" "}
                    {product?.highlights.map((list, index) => (
                      <p key={index}>
                        <span className="font-bold">{index + 1}.</span> {list}
                      </p>
                    ))}
                  </td>
                </tr>
              )}
              {section === "restaurant" && (
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                    Ingredients
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {" "}
                    {product?.ingredients.map((list, index) => (
                      <p key={index}>
                        <span className="font-bold">{index + 1}.</span> {list}
                      </p>
                    ))}
                  </td>
                </tr>
              )}
              {section === "gym" && (
                <tr>
                  <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Facilities
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {" "}
                    {product?.facilities.map((list, index) => (
                      <p key={index}>
                        <span className="font-bold">{index + 1}.</span> {list}
                      </p>
                    ))}
                  </td>
                </tr>
              )}
              <tr>
                <th className="border-gray-300 border p-2 px-4 bg-gray-200">
                  Description
                </th>
                <td className="border-gray-300 border p-2 px-4">
                  {product.description}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAllDetails;
