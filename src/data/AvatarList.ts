import img_nino from '../static/Nino.jpeg'
import img_nyanko from '../static/Nyanko.png'
import img_yukari from '../static/Yukari.png'

type Avatar = {
    id: string,
    name: string
    url: string,
    color: string,
    guchiExample?: string,
    suffix: string
  }

export const avatarList: Avatar[] = [
    {
      id: '1',
      name: 'nyanko',
      url: img_nyanko,
      color: '#63B3ED',
      guchiExample: 'ふざけんにゃ!',
      suffix: 'にゃ'
    },
    {
      id: '2',
      name: 'Nino',
      url: img_nino,
      color: '#D53F8C',
      guchiExample: 'ふざけんななのよ!',
      suffix: 'なのよ'
    },
    {
      id: '3',
      name: 'Yukari',
      url: img_yukari,
      color: '#9F7AEA',
      guchiExample: 'ふざけないでください。',
      suffix: 'ください'
    },
  ]