import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNutritionApi, deleteNutritionApi, updateNutritionApi } from "../api/nutritionApi";

export const addNutrition = createAsyncThunk(
  "add/nutrition",
  async ({ section, formData }, { rejectWithValue }) => {
    try {
      console.log(section);
      console.log(formData);

      const data = await addNutritionApi(section, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateNutrition = createAsyncThunk(
  "update/nutrition",
  async ({ section, formData }, { rejectWithValue }) => {
    try {
      console.log(section);
      console.log(formData);

      const data = await updateNutritionApi(section, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteNutrition = createAsyncThunk(
  "delete/nutrition",
  async ({ Id }, { rejectWithValue }) => {
    try {
      console.log();
      
      await deleteNutritionApi(Id);
      return Id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState: {
    nutrition: [],
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
      .addCase(addNutrition.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNutrition.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.nutrition = [...state.nutrition, ...action.payload];
        } else {
          state.nutrition.push(action.payload);
        }
      })
      .addCase(addNutrition.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateNutrition.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNutrition.fulfilled, (state, action) => {
        state.loading = false;
        state.nutrition = action.payload;
      })
      .addCase(updateNutrition.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteNutrition.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNutrition.fulfilled, (state, action) => {
        state.loading = false;
        state.nutrition = state.nutrition.id !== action.payload
      })
      .addCase(deleteNutrition.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSelectedSection } = nutritionSlice.actions;
export default nutritionSlice.reducer;
