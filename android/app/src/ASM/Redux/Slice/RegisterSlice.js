import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const Register = createAsyncThunk('users/signup', async data => {
  const response = await fetch('https://apis-hlv8.onrender.com/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed');
  }
  return await response.json();
});

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    registerData: {},
    registerStatus: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Register.pending, (state, action) => {
        state.registerStatus = 'loading';
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.registerStatus = 'succeeded';
        state.registerData = action.payload;
      })
      .addCase(Register.rejected, (state, action) => {
        state.registerStatus = 'failed';
        console.log(action.error.message);
      });
  },
});

export default registerSlice.reducer;
