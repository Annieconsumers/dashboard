
const ViewGymNutrition = ({nutrition, onClose}) => {
  return (
    <div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] max-w-[1200px] bg-white rounded-xl shadow-lg z-50 overflow-auto">
        <div className="border-b border-gray-300 py-5 px-6 flex justify-between items-center">
          <h3 className="font-bold text-2xl">Nutrition Details</h3>
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
                      {Array.isArray(nutrition.image_urls) ? (
                        nutrition.image_urls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`nutrition ${index + 1}`}
                            className="h-24 w-24 object-cover rounded border cursor-pointer"
                            onMouseEnter={() => setZoomedImage(url)}
                            onMouseLeave={() => setZoomedImage(null)}
                          />
                        ))
                      ) : (
                        <img
                          src={nutrition.image_urls}
                          alt="nutrition"
                          className="h-24 w-24 object-cover rounded border"
                          onMouseEnter={() =>
                            setZoomedImage(nutrition.image_urls)
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
                    {nutrition.id}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">Name</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {nutrition.name}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border-gray-300 border p-2 px-4">
                    Protien (gm)
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {nutrition.protein}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">Calories (Cal)</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {nutrition.calories}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border-gray-300 border p-2 px-4">
                    Serving
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {nutrition.serving}
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>

          {/* Right Column for Benefits */}
          <div className="w-full md:w-1/3">
            <h4 className="font-semibold text-lg mb-2 underline">Benefits</h4>
            <ul className="list-disc list-inside space-y-2">
              {Array.isArray(nutrition.description) &&
              nutrition.description.length > 0 ? (
                nutrition.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No description listed</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewGymNutrition