import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchProducts = createAsyncThunk('products', async () => {
  try {
    const response = await fetch('http://localhost:5001/products');
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
});

const postProducts = createAsyncThunk('post/product', async newSale => {
  try {
    await fetch('http://localhost:5001/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSale),
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateProducts = createAsyncThunk('update/product', async updItem => {
  try {
    await fetch(`http://localhost:5001/products/${updItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updItem),
    });
  } catch (error) {
    throw new Error(error);
  }
});

const initialState = {
  products: [],
  saleRecord: [],
  total_amount: 0,
};

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    addRecord: (state, action) => {
      state.saleRecord.push(action.payload);
    },
    calculateTotalAmount: (state, action) => {
      const sumTotal = state.saleRecord.reduce((prevValue, currValue) => {
        return (state.total_amount = prevValue + currValue.total_amount);
      }, 0);

      state.total_amount = sumTotal;
    },
    changeQuantityOfProduct: (state, action) => {
      const editedItem = state.saleRecord.find(
        el => el.product_id === action.payload.itemId,
      );

      editedItem.product_quantity = action.payload.value;
      editedItem.total_amount =
        editedItem.product_quantity * editedItem.product_price;

      const newData = state.saleRecord.map(item =>
        item.product_id === action.payload.itemId
          ? { ...item, ...editedItem }
          : item,
      );

      // calculateTotalAmount();

      saleSlice.caseReducers.calculateTotalAmount(state, action);

      state.saleRecord = newData;
    },
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const {
  addRecord,
  calculateTotalAmount,
  changeQuantityOfProduct,
  reset,
} = saleSlice.actions;
export { fetchProducts, postProducts, updateProducts };

export default saleSlice.reducer;
