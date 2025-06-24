import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface LoaderState {
  [key: string]: boolean
}

const initialState: LoaderState = {}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    loaderChange: (state, action: PayloadAction<{ name: string; value: boolean }>) => {
      const { name, value } = action.payload

      state[name] = value
    },
    initialLoaderState: () => initialState // Correctly resets the state
  }
})

export const { loaderChange, initialLoaderState } = loaderSlice.actions

export default loaderSlice.reducer
