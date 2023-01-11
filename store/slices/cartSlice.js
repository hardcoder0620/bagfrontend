import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state,action) => {
       
        return [...state,action.payload]
      
    },
    updateCart: (state,action) => {
      return [...action.payload]
  },
   
  },
})
// Action creators are generated for each case reducer function
export const { addToCart,updateCart } = cartSlice.actions

export default cartSlice.reducer