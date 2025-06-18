import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addEmployeeApi, employeeUpdateApi, fetchEmployeeApi, fetchEmployeeRequestsApi } from "../api/employeeApi";

export const createEmployee = createAsyncThunk(
  "employee/create",
  async (formData) => {
    const employee = await addEmployeeApi(formData);
    // console.log(formData);
    return employee;
  }
);

export const getEmployeeRequests = createAsyncThunk("employee-requests/fetch", async () => {
    const employeesList = await fetchEmployeeRequestsApi();
    return employeesList;
  });

export const getEmployees = createAsyncThunk("employee/fetch", async () => {
  const employeesList = await fetchEmployeeApi();
  return employeesList;
});

  export const updateEmployee = createAsyncThunk("update/employee", async(formData) =>{
    console.log(formData);
    const employee = await employeeUpdateApi(formData)
    return employee
  })


const employeeSlice = createSlice({
    name: "employee",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        (state.loading = true), 
        (state.error = null);
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getEmployeeRequests.pending, (state) => {
        (state.loading = true), 
        (state.error = null);
      })
      .addCase(getEmployeeRequests.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(getEmployeeRequests.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getEmployees.pending, (state) => {
        (state.loading = true), 
        (state.error = null);
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        (state.loading = true), 
        (state.error = null);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer