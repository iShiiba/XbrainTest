import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer'
import formReducer from './formReducer'

export const store = configureStore({
  reducer: {cart: cartReducer, form: formReducer},
})