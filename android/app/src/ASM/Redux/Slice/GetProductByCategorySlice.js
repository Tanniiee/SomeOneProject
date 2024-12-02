import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const GetProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async (typeId = null, thunkAPI) => {
    try {
      const url = typeId
        ? `https://apis-hlv8.onrender.com/product/getProducts/${typeId}`
        : 'https://apis-hlv8.onrender.com/product/getProducts';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorText}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return thunkAPI.rejectWithValue({
        message: 'Server error',
        error: error.toString(),
      });
    }
  },
);

const GetProductByCategory = createSlice({
  name: 'getProductByCategory',
  initialState: {
    getProductByCategoryData: [],
    getProductByCategoryStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetProductsByCategory.pending, state => {
        state.getProductByCategoryStatus = 'loading';
      })
      .addCase(GetProductsByCategory.fulfilled, (state, action) => {
        state.getProductByCategoryStatus = 'succeeded';
        state.getProductByCategoryData = action.payload.products || [];
      })
      .addCase(GetProductsByCategory.rejected, (state, action) => {
        state.getProductByCategoryStatus = 'failed';
        console.log('Error:', action.payload?.message || 'Unknown error');
      });
  },
});

export default GetProductByCategory.reducer;
