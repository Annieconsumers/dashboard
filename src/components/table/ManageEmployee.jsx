import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../redux/slices/employeeSlice";
import ViewEmployeeDetails from "../preview/ViewEmployeeDetails";
import UpdateEmployee from "../form/update/UpdateEmployee";

const ManageEmployee = () => {
  const { employees } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const [isShowEmployee, setIsShowEmployee] = useState(false);
  const [showEmployee, setShowEmployee] = useState(null);

  const handleShowEmployee = (employee) => {
    setIsShowEmployee(true);
    setShowEmployee(employee);
  };

  const handleCloseEmployee = () => {
    setIsShowEmployee(false);
    setShowEmployee(null);
  };

  const [isUpdateEmployee, setIsUpdateEmployee] = useState(false);

  const handleShowUpdateForm = (employee) => {
    setIsUpdateEmployee(true);
    setShowEmployee(employee);
  };

  const handleCloseUpdateForm = () => {
    setIsUpdateEmployee(false);
    setShowEmployee(null);
  };

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.serialNo,
      width: "100px",
    },
    {
      name: "Segment",
      selector: (row) => row.segment,
      width: "100px",
    },
    {
      name: "Profile Pic",
      selector: (row) => row.profile_pic,
      width: "150px",
    },
    {
      name: "Seller id",
      selector: (row) => row.seller_id,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.user_name,
    },
    {
      name: "contact No",
      selector: (row) => row.phone_number,
      width: "150px",
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      width: "150px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      center: "true",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      width: "150px",
    },
  ];

  const data = employees?.map((item, index) => ({
    serialNo: index + 1,
    profile_pic: (
      <img src={item.profile_image_url} alt="" className="h-15 w-15" />
    ),
    seller_id: item.seller_id.slice(0, 8),
    user_name: item.name,
    phone_number: item.phone,
    designation: item.role,
    address: <div>{item.address}</div>,
    action: (
      <div className="inline-flex items-center text-white justify-center gap-1 w-full">
        <button
          onClick={() => handleShowEmployee(item)}
          className="bg-green-600 cursor-pointer text-3xl rounded-md p-1"
        >
          <IoEyeOutline />
        </button>
        <button
          type="button"
          onClick={() => handleShowUpdateForm(item)}
          className="bg-blue-500 cursor-pointer text-3xl rounded-md p-1"
        >
          <MdOutlineModeEdit />
        </button>
      </div>
    ),
    status: (
      <div className="inline-flex items-center text-white justify-center gap-1 w-full">
        {item.is_verified === true ? (
          <p className="bg-green-600 cursor-pointer text-lg rounded-md px-3">
            Verified
          </p>
        ) : (
          <p className="bg-red-600 cursor-pointer text-lg rounded-md px-3">
            Not verified
          </p>
        )}
      </div>
    ),
    segment: item.section,
  }));

  const customStyles = {
    headCells: {
      style: {
        borderBottom: "1px solid black", // Bottom border for header cells
        borderRight: "1px solid gray", // Right border for header cells
        backgroundColor: "#f4f4f4", // Light gray background
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
    <div>
      <div className=" m-5 p-2 text-5xl font-semibold  sticky top-0 z-10 ">
        <h1>Manage Employees</h1>
      </div>
      <div className="max-h-[75vh] max-w-[81vw]">
        <DataTable
          fixedHeader
          columns={columns}
          data={data}
          customStyles={customStyles}
          // fixedHeaderScrollHeight="67vh"
          pagination
          defaultSortFieldId={1}
        />
      </div>
      {isShowEmployee && (
        <>
          <div
            className="fixed z-20 inset-0 bg-black/70 "
            onClick={() => setIsShowEmployee(false)}
          ></div>
          <div>
            <ViewEmployeeDetails
              employee={showEmployee}
              onClose={handleCloseEmployee}
            />
          </div>
        </>
      )}

      {isUpdateEmployee && (
        <>
          <div
            className="fixed inset-0 z-20 bg-black/70 " ></div>
          <div>
            <UpdateEmployee
              employee={showEmployee}
              onClose={handleCloseUpdateForm}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ManageEmployee;
