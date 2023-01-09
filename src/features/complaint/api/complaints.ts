import { Complaint } from '../complaintSlice'
import { axiosInstance } from '../../../api/axiosInstance'

export async function getComplaints(): Promise<any> {
    return await axiosInstance.get('/complaints')
        .then(res => {
            console.log(`get /complaints res:`, res) 
            console.log(res.data)
            return res
        })
        .catch(err => {
            console.log(err)
        })
}

export async function getComplaintsByTimestamp(from: string, to: string): Promise<any> {
    return await axiosInstance
        .get('/complaints/between-time', {
            params: {
                from,
                to
            }
        })
        .then(res => {
            console.log(`get /complaints res:`, res) 
            console.log(res.data)
            return res
        })
        .catch(err => {
            console.log(err)
        })
}

export async function createComplaint(req: Complaint): Promise<Complaint> {
    const result:Complaint = await axiosInstance.post<Complaint>('/complaints', req)
        .then(res => {
            console.log(`get /complaints res:`, res) 
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
            return err
        })
    return result
}

export async function deleteComplaintById(complaintId: string): Promise<void> {
    const result:Complaint = await axiosInstance.delete<string>(`/complaints/${complaintId}`)
        .then(res => {
            console.log(`delete /complaints/${complaintId} res:`, res) 
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

// レスポンス
// [
//     {
//         "complaintText": "もうやだ",
//         "avatarId": "1"
//     },
//     {
//         "complaintText": "やめてくれ",
//         "avatarId": "1"
//     },
//     {
//         "complaintText": "bbb",
//         "avatarId": "1"
//     },
//     {
//         "complaintText": "bbb",
//         "avatarId": "1"
//     },
//     {
//         "complaintText": "bbb",
//         "avatarId": "1"
//     },
//     {
//         "complaintText": "bbb",
//         "avatarId": "1"
//     },
//     {
//         "complaintText": "いやよーいやいや",
//         "avatarId": "2"
//     }
// ]