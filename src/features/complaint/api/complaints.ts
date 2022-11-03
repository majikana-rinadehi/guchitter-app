import axios from 'axios' 

export async function getComplaints(): Promise<any> {
    return await axios.get('http://localhost:8080/complaints')
        .then(res => {
            console.log(`get /complaints res:`, res) 
            console.log(res.data)
            return res
        })
        .catch(err => {
            console.log(err)
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