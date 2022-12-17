import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { fetchComplaints } from "../../api/mock";
import { AppState } from "../../app/store";
import { getDatesYYYY_MM_DD } from "../../util/util";
import { createComplaint, getComplaintsByTimestamp, deleteComplaintById } from "./api/complaints";

export type Complaint = {
    complaintId?: string
    complaintText: string,
    avatarId: string
}

type ComplaintState = {
    /** complaintの配列 */
    complaint: Complaint[],
    /** action の状態。extraReducersの各ケースの中で、actionの`type`に応じて明示的に設定する必要がある。 */
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
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
        const date = new Date()
        const { from, to } = getDatesYYYY_MM_DD(date, 1)
        const response = await getComplaintsByTimestamp(from, to)
        console.log('response:', response)
        return response.data
    }
)

export const addComplaint = createAsyncThunk(
    'complaint/addComplaint',
    async (req: Complaint) => {
        console.log('start complaint/addComplaint')
        const response = await createComplaint(req)
        console.log('response:', response)
        return response
    }
)

export const deleteComplaint = createAsyncThunk(
    'complaint/deleteComplaint',
    async (req: string) => {
        console.log('start complaint/deleteComplaint')
        await deleteComplaintById(req)
        return req
    }
)

export const complaintSlice = createSlice({
    name: 'complaint',
    initialState: initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            /** fetch */
            .addCase(fetch.pending, (state, action) => {
                console.log('fetch:pending')
                state.status = 'pending'
            })
            .addCase(fetch.fulfilled, (state, action) => {
                console.log('fetch:fulfilled')
                // this doesn't work
                // state = state.concat(action.payload)

                // this doesn't work
                // state = action.payload
                state.complaint = action.payload
                state.status = 'fulfilled'
            })
            .addCase(fetch.rejected, (state, action) => {
                console.log('fetch:rejected')
                state.status = 'rejected'
            })
            /** add */
            .addCase(addComplaint.pending, (state, action) => {
                console.log('addComplaint:pending')
                state.status = 'pending'
            })
            .addCase(addComplaint.fulfilled, (state, action) => {
                console.log('addComplaint:fulfilled')
                state.complaint.push(
                    action.payload
                )
                state.status = 'fulfilled'
            })
            .addCase(addComplaint.rejected, (state, action) => {
                console.log('addComplaint:rejected')
                state.status = 'rejected'
            })
            /** delete */
            .addCase(deleteComplaint.pending, (state, action) => {
                console.log('deleteComplaint:pending')
                state.status = 'pending'
            })
            .addCase(deleteComplaint.fulfilled, (state, action) => {
                console.log('deleteComplaint:fulfilled')
                console.log('action.payload',action.payload)
                console.log(state.complaint.findIndex(complaint => 
                    complaint.complaintId === action.payload))
                state.complaint.splice(
                    state.complaint.findIndex(complaint => 
                        complaint.complaintId === action.payload),1
                )
                state.status = 'fulfilled'
            })
            .addCase(deleteComplaint.rejected, (state, action) => {
                console.log('deleteComplaint:rejected')
                state.status = 'rejected'
            })

    },
})

export const {
} = complaintSlice.actions

export default complaintSlice.reducer

export const complaintSelector = (state: AppState) => state.complaint.complaint