type Avatar = {
    id: string,
    name: string
    url: string,
    color: string,
    guchiExample?: string
  }

export const avatarList: Avatar[] = [
    {
      id: '1',
      name: 'nyanko',
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDilPlv3VM_vfLX3E8XKKS_VozQaPA0gi4ScEECZM&s",
      color: '#63B3ED',
      guchiExample: 'ふざけんにゃ!'
    },
    {
      id: '2',
      name: 'Nino',
      url: "https://pbs.twimg.com/media/EcW6HMUU0AAkPGe.jpg",
      color: '#D53F8C',
      guchiExample: 'ふざけんななのよ!'
    },
    {
      id: '3',
      name: 'Yukari',
      url: 'https://aivoice.jp/wp-content/uploads/2022/03/yukari_pic1.png',
      color: '#9F7AEA',
      guchiExample: 'ふざけないでください。'
    },
  ]