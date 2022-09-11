import { configureStore } from '@reduxjs/toolkit';
import saleSlice from './addSaleSlice';
import productSlice from './productSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
    sale: saleSlice,
  },
});
