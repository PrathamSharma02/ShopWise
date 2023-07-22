import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        totalItems:0,
        total: 0,
    },
    reducers:{
        addProduct:(state,action)=>{
            // state.quantity+=1;
            // state.products.push(action.payload);
            // state.total+= action.payload.price *action.payload.quantity;
            const productToAdd = action.payload;
      const existingProduct = state.products.find(
        (product) => product._id === productToAdd._id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...productToAdd, quantity: 1 });
      }
      state.totalItems += 1;
      state.total += productToAdd.price;
        },
        deleteProduct: (state, action) => {
            const productId = action.payload;
      const existingProduct = state.products.find(
        (product) => product._id === productId
      );

      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          state.products = state.products.filter(
            (product) => product._id !== productId
          );
        } else {
          existingProduct.quantity -= 1;
        }
        state.totalItems -= 1;
        state.total -= existingProduct.price;
      }
          },
    },

});

export const {addProduct,deleteProduct} = cartSlice.actions
export default cartSlice.reducer;
