import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProductToDB,
  deleteAllImage,
  deleteProductApi,
  fetchProducts,
  searchProductApi,
  updateProductApi,
} from "../api/productApi";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ productData, section }, { rejectWithValue }) => {
    // ✅ Receive section from UI
    try {
      console.log("Submitting product:", productData, "Section:", section);
      const response = await addProductToDB(section, productData); // ✅ Use passed section
      if (!response) throw new Error("Failed to add product.");
      return response[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/fetch",
  async ({ page, section }, { rejectWithValue }) => {
    try {    
      console.log(page);

      const data = await fetchProducts(page, section );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteProduct = createAsyncThunk(
  "product/delete",
  async ({ section, productId }, { rejectWithValue }) => {
    try {
      await deleteProductApi(section, productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "product/imageDelete",
  async ({ selectedSection, productId, imageUrl }, { rejectWithValue }) => {
    try {
      await deleteAllImage(selectedSection, productId, [imageUrl]); // Ensure it's an array
      return imageUrl;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProducts = createAsyncThunk(
  "product/update",
  async ({ section, productId, updateProducts }, { rejectWithValue }) => {
    try {
      const updatedProduct = await updateProductApi(
        section,
        productId,
        updateProducts
      );
      return { productId, updatedProduct };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchedProducts = createAsyncThunk(
  "product/search",
  async ({page, section, searchQuery }, { rejectWithValue }) => {
    try {
      const data = await searchProductApi(page, section, searchQuery);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    page: 0,
    loading:false,
    hasMore: true,
    selectedSection: localStorage.getItem("selectedSection"),
    selectList: localStorage.getItem("list")
  },
  reducers: {
    clearProducts(state) {
      state.products = [];
      state.hasMore = true;
    },
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
      localStorage.setItem("selectedSection", action.payload);
    },
    setSelectList: (state, action) =>{
      state.selectList = action.payload;
      localStorage.setItem("list", action.payload)
    },
    resetProducts: (state) => {
      state.products = [];
      state.page = 0;
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(action.payload)) {
          state.products = [...state.products, ...action.payload]; // ✅ Merge arrays
        } else {
          state.products.push(action.payload); // ✅ Push single object
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
      
        if (!Array.isArray(action.payload)) {
          console.error("Expected payload to be an array, but got:", action.payload);
          state.status = "failed";
          return;
        }
      
        if (action.payload.length < 10) {
          state.hasMore = false;
        }
      
        state.products = [...state.products, ...action.payload];
        state.page += 1;
      })      
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.products = action.payload;
      })
      .addCase(updateProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = state.products.map((product) =>
          product.id === action.payload.productId
            ? action.payload.updatedProduct
            : product
        );
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(searchedProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchedProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
           if (!Array.isArray(action.payload)) {
          console.error("Expected payload to be an array, but got:", action.payload);
          state.status = "failed";
          return;
        }
      
        if (action.payload.length < 10) {
          state.hasMore = false;
        }
      
        state.products = [...state.products, ...action.payload];
        state.page += 1;
      })
      .addCase(searchedProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setSelectedSection, setSelectList, clearProducts } = productSlice.actions;
export default productSlice.reducer;
