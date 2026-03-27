import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  currentOrder: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      state.currentOrder = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { addOrder, setOrders } = orderSlice.actions;
export default orderSlice.reducer;
