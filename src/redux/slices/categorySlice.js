import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  {fetchCategory, addCategoryApi, deleteCategoryApi, updateCategoryApi, fetchbannersApi, addHomeSliderApi } from "../api/categoryApi";

export const getCategories = createAsyncThunk("category/fetch", async(section)=>{
    const categories = await fetchCategory(section);
    return categories
})

export const getBanners = createAsyncThunk("category/get-banners", async() => {
  const banners = await fetchbannersApi()
  return banners
})

export const addCategory = createAsyncThunk("category/create", async (categoryData) => {
  const newCategory = await addCategoryApi(categoryData);  // API call here
  console.log(categoryData);
  return newCategory;
});

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await deleteCategoryApi(categoryId);
      return categoryId; // Return ID to remove from Redux state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await updateCategoryApi(categoryData)
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addHomeSlider = createAsyncThunk("banner/add-banner", async ({ bannerData, categoryId, section }) => {
  console.log("Data in thunk:", bannerData, categoryId, section);
  const response = await addHomeSliderApi(bannerData, categoryId, section);
  return response;
});

const categorySlice = createSlice({
    name: "category",
    initialState : {
        categories: [],
        selectedSection: localStorage.getItem("selectedSection"),
        loading: false,
        error: null,
    },
    reducers: {
      setSelectedSection: (state, action) => {
        state.selectedSection = action.payload;
        localStorage.setItem("selectedSection", action.payload)
      },
    },    
        extraReducers: (builder) => {
            builder
              .addCase(getCategories.pending, (state) => {
                state.loading = true;
              })
              .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
              })
              .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })
              .addCase(addCategory.pending, (state) =>{
                state.loading = true
              })
              .addCase(addCategory.fulfilled, (state, action) =>{
                state.loading = false
                state.categories.push(action.payload)
              })
              .addCase(addCategory.rejected, (state, action) =>{
                state.loading = false;
                state.error = action.payload
              })
              .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                  (category) => category.id !== action.payload
                );
              })
              .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })
              .addCase(updateCategory.pending, (state)=>{
                state.loading = true
              })
              .addCase(updateCategory.fulfilled, (state, action) =>{
                state.loading = false;
                const updatedCategory = action.payload;
                state.categories = state.categories.map((category) =>
                  category.id === updatedCategory.id ? updatedCategory : category
                );
              })
              .addCase(updateCategory.rejected, (state)=>{
                state.loading = false,
                state.error = action.payload;
              })
              .addCase(getBanners.pending, (state)=>{
                state.loading = true
              })
              .addCase(getBanners.fulfilled, (state, action)=>{
                state.loading = false;
                state.categories = action.payload
              })
              .addCase(getBanners.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload
              })
              .addCase(addHomeSlider.pending, (state)=>{
                state.loading = true
              })
              .addCase(addHomeSlider.fulfilled, (state, action)=>{
                state.loading = false,
                state.categories = action.payload;
              })
            }
})

export const { setSelectedSection } = categorySlice.actions;
export default categorySlice.reducer;
 