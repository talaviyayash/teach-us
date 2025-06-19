import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface DataState {
  chat: Record<string, unknown>
  [key: string]: any
}

const initialState: DataState = {
  chat: {}
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addPayloadData: (state, action: PayloadAction<{ name: string; data: any }>) => {
      const { name, data } = action.payload

      state[name] = data
    },
    initialDataState: () => initialState
  }
})

export const { addPayloadData, initialDataState } = dataSlice.actions

export default dataSlice.reducer
