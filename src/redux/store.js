import { configureStore } from '@reduxjs/toolkit';
import buyerReducer from './buyerSlice';

export const store = configureStore({
  reducer: {
    buyers: buyerReducer,
  },
});
