import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const GetCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://apis-hlv8.onrender.com/type/view', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

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

const getCategoriesSlice = createSlice({
  name: 'getCategories',
  initialState: {
    categoriesData: [],
    categoriesStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetCategories.pending, state => {
        state.categoriesStatus = 'loading';
      })
      .addCase(GetCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded';
        state.categoriesData = [
          {_id: null, typeName: 'Tất cả'},
          ...action.payload.data,
        ];
      })
      .addCase(GetCategories.rejected, (state, action) => {
        state.categoriesStatus = 'failed';
        console.log('Error:', action.payload?.message || 'Unknown error');
      });
  },
});

export default getCategoriesSlice.reducer;
