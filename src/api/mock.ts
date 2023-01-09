import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Guchi, guchiList } from '../data/GuchiList'

const mock = new MockAdapter(axios)

mock.onGet('/complaints')
    .reply(200,
        {
            data: guchiList
        }
    )

export const fetchComplaints = async () => {
    type Res = { data: Guchi[] }
    return await axios.get<Res>('/complaints').then(res => res)
}