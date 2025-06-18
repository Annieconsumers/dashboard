import { useState } from "react";

const ViewWorkoutProduct = ({ workout, onClose }) => {
  console.log(workout);
  const [zoomedImage, setZoomedImage] = useState(null);

  return (
    <div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[70vw] max-w-[1200px] bg-white rounded-xl shadow-lg z-50 overflow-auto">
        <div className="border-b border-gray-300 py-5 px-6 flex justify-between items-center">
          <h3 className="font-bold text-2xl">Workout Details</h3>
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
                      {Array.isArray(workout.image_urls) ? (
                        workout.image_urls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Workout ${index + 1}`}
                            className="h-24 w-24 object-cover rounded border cursor-pointer"
                            onMouseEnter={() => setZoomedImage(url)}
                            onMouseLeave={() => setZoomedImage(null)}
                          />
                        ))
                      ) : (
                        <img
                          src={workout.image_urls}
                          alt="Workout"
                          className="h-24 w-24 object-cover rounded border"
                          onMouseEnter={() =>
                            setZoomedImage(workout.image_urls)
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
                    {workout.id}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">Name</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {workout.name}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border-gray-300 border p-2 px-4">
                    Muscles Targeted
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {workout.muscles_targeted}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">Duration</th>
                  <td className="border-gray-300 border p-2 px-4">
                    {workout.duration}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border-gray-300 border p-2 px-4">
                    Difficulty Level
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {workout.difficulty_level}
                  </td>
                </tr>
                <tr>
                  <th className="border-gray-300 border p-2 px-4">
                    Repetition
                  </th>
                  <td className="border-gray-300 border p-2 px-4">
                    {workout.repetition}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Column for Benefits */}
          <div className="w-full md:w-1/2">
            <h4 className="font-semibold text-lg mb-2 underline">Benefits</h4>
            <ul className="list-disc list-inside space-y-2">
              {Array.isArray(workout.benefits) &&
              workout.benefits.length > 0 ? (
                workout.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No benefits listed</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {zoomedImage && (
        <>
          <div className="fixed inset-0 bg-black/70 z-20"></div>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onMouseLeave={() => setZoomedImage(null)}
          >
            <img
              src={zoomedImage}
              alt="Zoomed Workout"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg z-[100]"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ViewWorkoutProduct;
