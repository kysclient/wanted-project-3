import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productSlice'
import reserveSlice from './slices/reserveSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  product: productSlice.reducer,
  reserve: reserveSlice.reducer,
})

const initialState = {}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
  enhancers: defaultEnhancers => [...defaultEnhancers],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
