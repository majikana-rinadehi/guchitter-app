import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";

type Guchi = {
    guchiText: string,
    avatarId: string
}

const initialState: Guchi[] = [
    {
        guchiText: 'やってられないにゃ!',
        avatarId: '1'
    },
]

export const guchiSlice = createSlice({
    name: 'guchi',
    initialState: initialState,
    reducers: {
        addGuchi: (state, action: PayloadAction<{guchiText: string, avatarId: string}>) => {
            state.push({
                guchiText: action.payload.guchiText,
                avatarId: action.payload.avatarId
            })
        }
    }
})

export const {
    addGuchi
} = guchiSlice.actions

export default guchiSlice.reducer

export const guchiSelector = (state: AppState) => state.guchi