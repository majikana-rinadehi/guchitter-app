import { Avatar } from '../avatarSlice'
import { axiosInstance } from '../../../api/axiosInstance'

export async function getAvatars(): Promise<Avatar[]> {
    const result: Avatar[] = await axiosInstance.get<Avatar[]>('/avatars')
        .then(res => {
            console.log(`get /avatars res:`, res) 
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
            throw new Error(err)
        })
    return result
}

export async function createAvatar(req: Avatar): Promise<Avatar> {
    const result:Avatar = await axiosInstance.post<Avatar>('/avatars', req)
        .then(res => {
            console.log(`post /avatars res:`, res) 
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
            console.log(`err.response.status`,err.response.status)
            throw new Error(err)
        })
    return result
}

export async function deleteAvatarById(avatarId: string): Promise<void> {
    await axiosInstance.delete<string>(`/avatars/${avatarId}`)
        .then(res => {
            console.log(`delete /avatars/${avatarId} res:`, res) 
        })
        .catch(err => {
            console.log(err)
            throw new Error(err)
        })
}