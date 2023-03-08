import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from './productSlice'

interface CommonState {
  reserveList: Product[]
}

const initialState: CommonState = {
  reserveList: [],
}

export const reserveSlice = createSlice({
  name: 'reserve',
  initialState,
  reducers: {
    setReserve(state, action: PayloadAction<Product[]>) {
      const copyState = state
      copyState.reserveList = action.payload
      return copyState
    },
    setReserveItemIncreasePrice(state, action: PayloadAction<number>) {
      const copyState = state
      copyState.reserveList = copyState.reserveList.map(item =>
        item.idx === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      return copyState
    },
    setReserveItemDecreasePrice(state, action: PayloadAction<number>) {
      const copyState = state
      copyState.reserveList = copyState.reserveList.map(item =>
        item.idx === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      return copyState
    },
    setDeleteReserveItem(state, action: PayloadAction<number>) {
      const copyState = state
      copyState.reserveList = copyState.reserveList.filter(
        item => item.idx !== action.payload
      )
      return copyState
    },
  },
})

export const {
  setReserve,
  setReserveItemIncreasePrice,
  setReserveItemDecreasePrice,
  setDeleteReserveItem,
} = reserveSlice.actions

export default reserveSlice
