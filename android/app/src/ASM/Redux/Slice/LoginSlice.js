import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const Login = createAsyncThunk('users/login', async (data, thunkAPI) => {
  try {
    const response = await fetch('https://apis-hlv8.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }

    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue({message: 'Server error'});
  }
});

const LoginSlice = createSlice({
  name: 'getCategories',
  initialState: {
    loginData: null,
    loginStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Login.pending, state => {
        state.loginStatus = 'loading';
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        state.loginData = action.payload;
      })
      .addCase(Login.rejected, (state, action) => {
        state.loginStatus = 'failed';
        console.log('Error:', action.payload?.message || 'Unknown error');
      });
  },
});

export default LoginSlice.reducer;
