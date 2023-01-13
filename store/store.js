import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: { counterReducer,cartReducer,userReducer},
})