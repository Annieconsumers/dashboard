import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addWorkoutApi, deleteWorkoutApi, updateWorkoutApi } from "../api/workoutApi";

export const addWorkout = createAsyncThunk(
  "add/workout",
  async ({ section, formData }, { rejectWithValue }) => {
    try {
      console.log(section);
      console.log(formData);

      const data = await addWorkoutApi(section, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWorkout = createAsyncThunk(
  "update/workout",
  async ({ section, formData }, { rejectWithValue }) => {
    try {
      console.log(section);
      console.log(formData);

      const data = await updateWorkoutApi(section, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWorkout = createAsyncThunk(
  "delete/workout",
  async ({ Id }, { rejectWithValue }) => {
    try {
      await deleteWorkoutApi(Id);
      return Id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workout: [],
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
      .addCase(addWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.workout = [...state.workout, ...action.payload];
        } else {
          state.workout.push(action.payload);
        }
      })
      .addCase(addWorkout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workout = action.payload;
      })
      .addCase(updateWorkout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workout = state.workout.filter((workout)=> workout.id !== action.payload)
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSelectedSection } = workoutSlice.actions;
export default workoutSlice.reducer;
