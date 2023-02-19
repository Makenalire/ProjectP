import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './score'

export const store = configureStore({
  reducer: {
    scoreCount: scoreReducer,
  },
})