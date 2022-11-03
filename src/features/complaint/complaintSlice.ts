import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { fetchComplaints } from "../../api/mock";
import { AppState } from "../../app/store";
import { getComplaints } from "./api/complaints";

type Complaint = {
    complaintText: string,
    avatarId: string
}

type ComplaintState = {
    complaint: Complaint[],
    status: string,
    error: null
}

const initialState: ComplaintState = {
    complaint: [],
    status: 'idle',
    error: null
}

export const fetch = createAsyncThunk(
    'complaint/fetch',
    async () => {
        console.log('start complaint/fetch')
        const response = await getComplaints()
        console.log('response:', response)
        return response.data
    }
)

export const complaintSlice = createSlice({
    name: 'complaint',
    initialState: initialState,
    reducers: {
        addComplaint: (state, action: PayloadAction<{complaintText: string, avatarId: string}>) => {
            state.complaint.push({
                complaintText: action.payload.complaintText,
                avatarId: action.payload.avatarId
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetch.pending,(state, action) => {
                console.log('pending')
            })
            .addCase(fetch.fulfilled, (state, action) => {
                console.log('action.payload:', action.payload)
                // this doesn't work
                // state = state.concat(action.payload)

                // this doesn't work
                // state = action.payload
                state.complaint = action.payload
                console.log('state:', state)
                // state.status = 'fullfilled'
            })
            .addCase(fetch.rejected,(state, action) => {
                console.log('rejected')
            })
    },
})

export const {
    addComplaint
} = complaintSlice.actions

export default complaintSlice.reducer

export const complaintSelector = (state: AppState) => state.complaint.complaint