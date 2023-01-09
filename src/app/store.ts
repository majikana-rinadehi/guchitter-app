import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import complaintReducer from '../features/complaint/complaintSlice'
import avatarReducer from '../features/avatar/avatarSlice'

export const store = configureStore({
    reducer: {
        complaint: complaintReducer,
        avatar: avatarReducer
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