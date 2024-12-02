import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const GetProducts = createAsyncThunk(
  'product/getProducts',
  async (data, thunkAPI) => {
    try {
      const response = await fetch(
        'https://apis-hlv8.onrender.com/product/getProducts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({message: 'Server error', error});
    }
  },
);

const getProductSlice = createSlice({
  name: 'getCategories',
  initialState: {
    getProductData: [],
    getProductStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetProducts.pending, state => {
        state.getProductStatus = 'loading';
      })
      .addCase(GetProducts.fulfilled, (state, action) => {
        state.getProductStatus = 'succeeded';
        state.getProductData = action.payload;
      })
      .addCase(GetProducts.rejected, (state, action) => {
        state.getProductStatus = 'failed';
        console.log('Error:', action.payload?.message || 'Unknown error');
      });
  },
});

export default getProductSlice.reducer;
