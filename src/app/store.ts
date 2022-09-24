import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import guchiReducer from '../features/guchi/guchiSlice'

export const store = configureStore({
    reducer: {
        guchi: guchiReducer
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>