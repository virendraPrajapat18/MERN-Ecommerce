import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading : false,
  featureImageList: [],
}

export const getFeatureImages = createAsyncThunk("/order/getFeatureImages",
  async()=>{
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/feature/get`
    );

    return response.data;
  }
);

export const addFeatureImages = createAsyncThunk(
  "/order/addFeatureImages",
  async (image) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);


const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers:{

  },
  extraReducers: (builder)=>{
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = true;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = true;
        state.featureImageList = [];
      });
  }
})

export default commonSlice.reducer;