import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface FlagState {
  [key: string]: unknown // Dynamic key-value pairs
}

export interface AppState {
  flag: FlagState
  userProfile?: unknown // Optional property to allow adding userProfile dynamically
}

const initialState: AppState = { flag: {} }

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<unknown>) => {
      state.userProfile = action.payload
    },
    addFlag: (state, action: PayloadAction<{ name: string; value: unknown }>) => {
      const { name, value } = action.payload

      state.flag[name] = value
    },
    initialAppState: () => initialState
  }
})

export const { addProfile, addFlag, initialAppState } = appSlice.actions
export default appSlice.reducer
