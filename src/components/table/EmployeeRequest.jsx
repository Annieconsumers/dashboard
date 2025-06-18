import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeRequests } from "../../redux/slices/employeeSlice";
import { acceptEmployeeApi } from "../../redux/api/employeeApi";
import ViewEmployeeDetails from "../preview/ViewEmployeeDetails";


const EmployeeRequest = () => {
    const {employees} = useSelector((state)=>state.employee)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getEmployeeRequests())
    }, [dispatch])
    
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

    const handleSubmitAccept = async(id) => {
        console.log(id);
        await acceptEmployeeApi(id)
        dispatch(getEmployeeRequests())
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
      name: "Preview",
      selector: (row) => row.preview,
      width: "100px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      width: "200px",
      center: "true",
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
    preview: (
      <button
       onClick={() => handleShowEmployee(item)}
        className="text-3xl cursor-pointer"
      >
        <FaEye />
      </button>
    ),
    action: (
      <div className="inline-flex items-center text-white justify-center gap-1 w-full">
        <button
          type="button"
          onClick={() => handleSubmitAccept(item.id)}
          className="bg-green-600 cursor-pointer text-lg rounded-md px-3 hover:bg-green-700"
        >
          Accept
        </button>
        {/* <button
          type="button"
          // onClick={() => handleSubmitReject(item.id)}
          className="bg-red-500 cursor-pointer text-lg rounded-md px-3 hover:bg-red-700"
        >
          Reject
        </button> */}
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
        <h1>Employee Requests</h1>
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
    </div>
  );
};

export default EmployeeRequest;
