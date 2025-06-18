import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSystemUsersApi } from "../api/systemUsers";

export const getSystemUser = createAsyncThunk("systeUser/fetch", async() => {
  const systemUser = await fetchSystemUsersApi();
  console.log(systemUser);
  
  return systemUser;
});

const systemUserSlice = createSlice({
  name: "systemUser",
  initialState: {
    systemUser: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getSystemUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSystemUser.fulfilled, (state, action)=>{
        state.loading  = false;
        state.systemUser = action.payload
    })
    .addCase(getSystemUser.rejected, (state, action)=>[
        state.loading = false,
        state.error = action.payload
    ]);
  },
});

export default systemUserSlice.reducer