import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addGymProductApi, deleteGymProductApi, updateGymProductApi } from "../api/gymProductApi";

export const addGymProduct = createAsyncThunk(
  "add/product",
  async ({ section, formData }, { rejectWithValue }) => {
    try {
      console.log(section);
      console.log(formData);

      const data = await addGymProductApi(section, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGymProduct = createAsyncThunk(
  "update/gymProduct",
  async ({ section, formData }, { rejectWithValue }) => {
    try {
      console.log(section);
      console.log(formData);

      const data = await updateGymProductApi(section, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGymProduct = createAsyncThunk(
  "delete/gymProduct",
  async ({ Id }, { rejectWithValue }) => {
    try {
      await deleteGymProductApi(Id);
      return Id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const gymProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    selectedSection: localStorage.getItem("selectedSection"),
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
      localStorage.setItem("selectedSection", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGymProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addGymProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.product = [...state.product, ...action.payload];
        } else {
          state.product.push(action.payload);
        }
      })
      .addCase(addGymProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateGymProduct.pending, (state) => {
              state.loading = true;
            })
            .addCase(updateGymProduct.fulfilled, (state, action) => {
              state.loading = false;
              state.product = action.payload;
            })
            .addCase(updateGymProduct.rejected, (state, action) => {
              state.error = action.payload;
            })
            .addCase(deleteGymProduct.pending, (state) => {
              state.loading = true;
            })
            .addCase(deleteGymProduct.fulfilled, (state, action) => {
              state.loading = false;
              state.product = state.product.filter((product)=> product.id !== action.payload)
            })
            .addCase(deleteGymProduct.rejected, (state, action) => {
              state.error = action.payload;
            });
  },
});

export const { setSelectedSection } = gymProductSlice.actions;
export default gymProductSlice.reducer;
