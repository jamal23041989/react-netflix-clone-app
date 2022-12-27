import { configureStore } from '@reduxjs/toolkit'
import netflixSlice from './netflixSlice'

export const store = configureStore({ reducer: { netflix: netflixSlice } })
