
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface DataState {
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const response = await fetch('https://payroll-api-three.vercel.app/fetch-salesforce-data');
    const data = await response.json();
  // return JSON.parse(data)
  return data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export default dataSlice.reducer;
