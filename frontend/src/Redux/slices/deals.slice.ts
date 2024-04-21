import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDeals } from '../../helpers/Deals';
import { Deal } from '../../types/Deal';

export interface DealsState {
  deals: Deal[];
  isloading: boolean;
  hasError: boolean;
}

const initialState: DealsState = {
  deals: [],
  isloading: false,
  hasError: false,
};

export const initDeals = createAsyncThunk('dealsSlice/fetch', () => {
  return fetchDeals('/deals');
});

export const dealsSlice = createSlice({
  name: 'dealsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initDeals.pending, (state) => {
      state.isloading = true;
      state.hasError = false;
    });
    builder.addCase(initDeals.fulfilled, (state, action) => {
      state.isloading = false;
      state.deals = action.payload;
    });
    builder.addCase(initDeals.rejected, (state) => {
      state.hasError = true;
      state.isloading = false;
    });
  },
});

export const {} = dealsSlice.actions;
export const dealsReducer = dealsSlice.reducer;
