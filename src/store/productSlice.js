import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchAllSales = createAsyncThunk('sales', async () => {
  try {
    const response = await fetch('http://localhost:5001/sales');
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSales = createAsyncThunk('deleteSales', async id => {
  try {
    await fetch(`http://localhost:5001/sales/${id}`, { method: 'DELETE' });

    return id;
  } catch (error) {
    throw new Error(error);
  }
});

const updateStatus = createAsyncThunk('updateStatus', async updItem => {
  try {
    await fetch(`http://localhost:5001/sales/${updItem.saleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem.updatedSale),
    });

    return updItem;
  } catch (error) {
    throw new Error(error);
  }
});

const initialState = { data: [], name: '', age: null };

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchAllSales.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteSales.fulfilled, (state, action) => {
      const newData = state.data.filter(item => item.id !== action.payload);

      state.data = newData;
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      const newData = state.data.map(item =>
        item.id === action.payload.saleId
          ? { ...item, ...action.payload.updatedSale }
          : item,
      );
      state.data = newData;
    });
  },
});

export const { reset } = productSlice.actions;
export { fetchAllSales, deleteSales, updateStatus };

export default productSlice.reducer;
