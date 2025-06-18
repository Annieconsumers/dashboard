import React from "react";

const ViewGymProducts = ({ product, onClose }) => {
  return (
    <div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] max-w-[1200px] bg-white rounded-xl shadow-lg z-50 overflow-auto">
        <div className="border-b border-gray-300 py-5 px-6 flex justify-between items-center">
          <h3 className="font-bold text-2xl">Gym Product Details</h3>
          <button
            onClick={onClose}
            className="bg-red-500 p-2 rounded-lg text-white cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto max-h-[70vh] p-6 flex flex-col md:flex-row gap-4">
          {/* Left Table with Details */}
          <div className="w-full md:w-2/3">
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">Images</th>
                  <td className="border-gray-300 border p-2 px-4">
                    <div className="flex flex-wrap gap-4">
                      {Array.isArray(product.image_urls) ? (
                        product.image_urls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`product ${index + 1}`}
                            className="h-24 w-24 object-cover rounded border cursor-pointer"
                            onMouseEnter={() => setZoomedImage(url)}
                            onMouseLeave={() => setZoomedImage(null)}
                          />
                        ))
                      ) : (
                        <img
                          src={product.image_urls}
                          alt="product"
                          className="h-24 w-24 object-cover rounded border"
                          onMouseEnter={() =>
                            setZoomedImage(product.image_urls)
                          }
                          onMouseLeave={() => setZoomedImage(null)}
                        />
                      )}
                    </div>
                  </td>
                </tr>

                <tr className="bg-gray-100">
                  <th className="border-gray-300 border p-2 px-4">ID</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {product.id}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">Name</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {product.name}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border-gray-300 border p-2 px-4">HSN Code</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {product.hsn_code}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">Price</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {product.price}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border-gray-300 border p-2 px-4">
                    Discount Percentage
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {product.discount_percentage}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">
                    Discounted Price
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {product.discount_price}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border-gray-300 border p-2 px-4">
                    GST Percentage
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {product.gst}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Column for Benefits */}
          <div className="w-full md:w-1/3">
            <div>
              <h4 className="font-semibold text-lg mb-2 underline">Benefits</h4>
              <ul className="list-disc list-inside space-y-2">
                {Array.isArray(product.description) &&
                product.description.length > 0 ? (
                  product.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No description listed</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2 underline">Description</h4>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGymProducts;
