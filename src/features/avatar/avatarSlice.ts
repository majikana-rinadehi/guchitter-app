import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadFile } from "../../api/aws";
import { AppState } from "../../app/store";
import { createAvatar, deleteAvatarById, getAvatars } from "./api/avatars";

export type Avatar = {
    avatarId?: string
    avatarName: string
    avatarText: string
    imageUrl: string
    color: string
}

type AvatarState = {
    /** avatarの配列 */
    avatar: Avatar[],
    /** action の状態。extraReducersの各ケースの中で、actionの`type`に応じて明示的に設定する必要がある。 */
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: null
}

const initialState: AvatarState = {
    avatar: [],
    status: 'idle',
    error: null
}

export const fetchAvatar = createAsyncThunk(
    'avatar/fetch',
    async () => {
        console.log('start avatar/fetch')
        const response = await getAvatars()
        console.log('response:', response)
        return response
    }
)

export const addAvatar = createAsyncThunk(
    'avatar/addAvatar',
    async (req: Avatar) => {
        console.log('start avatar/addAvatar')
        const response = await createAvatar(req)
        console.log('response:', response)
        return response
    }
)

export const deleteAvatar = createAsyncThunk(
    'avatar/deleteAvatar',
    async (req: string) => {
        console.log('start avatar/deleteAvatar')
        await deleteAvatarById(req)
        return req
    }
)

export const avatarSlice = createSlice({
    name: 'avatar',
    initialState: initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            /** fetch */
            .addCase(fetchAvatar.pending, (state, action) => {
                console.log('fetch:pending')
                state.status = 'pending'
            })
            .addCase(fetchAvatar.fulfilled, (state, action) => {
                console.log('fetch:fulfilled')
                // this doesn't work
                // state = state.concat(action.payload)

                // this doesn't work
                // state = action.payload
                state.avatar = action.payload
                state.status = 'fulfilled'
            })
            .addCase(fetchAvatar.rejected, (state, action) => {
                console.log('fetch:rejected')
                state.status = 'rejected'
            })
            /** add */
            .addCase(addAvatar.pending, (state, action) => {
                console.log('addAvatar:pending')
                state.status = 'pending'
            })
            .addCase(addAvatar.fulfilled, (state, action) => {
                console.log('addAvatar:fulfilled')
                state.avatar.push(
                    action.payload
                )
                state.status = 'fulfilled'
            })
            .addCase(addAvatar.rejected, (state, action) => {
                console.log('addAvatar:rejected')
                state.status = 'rejected'
            })
            /** delete */
            .addCase(deleteAvatar.pending, (state, action) => {
                console.log('deleteAvatar:pending')
                state.status = 'pending'
            })
            .addCase(deleteAvatar.fulfilled, (state, action) => {
                console.log('deleteAvatar:fulfilled')
                console.log('action.payload',action.payload)
                console.log(state.avatar.findIndex(avatar => 
                    avatar.avatarId === action.payload))
                state.avatar.splice(
                    state.avatar.findIndex(avatar => 
                        avatar.avatarId === action.payload),1
                )
                state.status = 'fulfilled'
            })
            .addCase(deleteAvatar.rejected, (state, action) => {
                console.log('deleteAvatar:rejected')
                state.status = 'rejected'
            })

    },
})

export const {
} = avatarSlice.actions

export default avatarSlice.reducer

export const avatarSelector = (state: AppState) => state.avatar.avatar