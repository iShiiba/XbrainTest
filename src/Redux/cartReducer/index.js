import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartUpdate: (state, action) => {
      const newProd = action.payload;
      const prodPosition = state.products.findIndex(
        (prod) => prod.id === newProd.id
      );

      if (prodPosition >= 0) {
        if (newProd.counter === 0) {
          state.products = state.products.filter(
            (prod) => prod.id !== newProd.id
          );
        } else {
          state.products[prodPosition] = newProd;
        }
      } else {
        state.products.push(newProd);
      }
      let newTotal = 0;
      state.products.forEach((prod) => (newTotal += prod.price * prod.counter));
      state.total = newTotal;
    },
    cartClear: (state) =>{
        state.total = 0;
        state.products = [];
    }
  },
});

export const { cartUpdate, cartClear } = cartSlice.actions;

export default cartSlice.reducer;
