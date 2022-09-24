import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Textarea,
  Mark,
  Heading,
  Flex,
  Avatar,
  Button,
  Wrap,
  WrapItem,
  Stack
} from "@chakra-ui/react"
import { useLayoutEffect, useRef, useState } from "react"
import { Fukidashi } from "./components/Fukidashi"
import { avatarList } from "./data/AvatarList"
import { guchiList as initGuchiList } from "./data/GuchiList"

export const App = () => {

  const [guchiText, setGuchiText] = useState('')
  const [guchiList, setGuchiList] = useState(initGuchiList)
  const [selectedAvatarId, setSelectedAvatarId] = useState('1')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const scrollButtomRef = useRef<HTMLDivElement>(null)

  const placeHolder = '(ΦωΦ)ぐちを入力してください(ΦωΦ)'
  const selectedAvatarUrl = avatarList.find(avatar => avatar.id === selectedAvatarId)?.url
  const selectedAvatarColor = avatarList.find(avatar => avatar.id === selectedAvatarId)?.color

  useLayoutEffect(() => {
    // 初期表示/愚痴ボタン押下時、最新のぐちが表示されるようスクロールする。
    // alignToTop
    // false の場合、要素の下端がスクロール可能祖先の表示範囲の下端に来るようにスクロールします。
    scrollButtomRef.current?.scrollIntoView(false)
  }, [guchiList])

  const onClickGuchiButton = () => {
    if (guchiText) {
      setGuchiList([...guchiList, { guchiText }])
    }
    textAreaRef.current!.value = ''
  }

  const onClickAvatar = (avatarId: string) => {
    setSelectedAvatarId(avatarId)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid gridTemplateRows={'3fr 1.5fr 1fr'} minH="90vh" p={3}>
          <Box
            height={'300px'} overflowY={'scroll'}
            justifyContent={'flex-end'} mt={'5'} rowGap={4}
            // boxShadowのプロパティ
            // x方向offset, y方向offset, ぼかし, 広がり, 色, inset
            boxShadow={'0 1.5em 1em -1em rgb(109 101 101) inset'}
          >
            {guchiList.map(guchi => {
              return (
                <Flex mt={5} gap={3}>
                  <Fukidashi bgColor={selectedAvatarColor} text={guchi.guchiText} />
                  <Avatar name="NH" src={selectedAvatarUrl} />
                </Flex>
              )
            })}
            <div ref={scrollButtomRef}></div>
          </Box>
          <VStack justifyContent={'flex-end'} pb={4}>
            <Textarea
              ref={textAreaRef}
              onChange={(e) => setGuchiText(e.target.value)}
              placeholder={placeHolder} />
            <Flex width={'300px'}>
              <Button onClick={() => onClickGuchiButton()} mr={'auto'}>
                グチる
              </Button>
              <Wrap>
                {avatarList.map(avatar => {
                  return (
                    <WrapItem>
                      <Avatar
                        onClick={() => onClickAvatar(avatar.id)}
                        size='md' border={avatar.id === selectedAvatarId ? `5px solid ${avatar.color}` : ''} src={avatar.url}>
                      </Avatar>
                    </WrapItem>
                  )
                })}
              </Wrap>
            </Flex>
          </VStack>
          <VStack spacing={4}>
            <Heading as='h2' size='2xl'>
              <Mark bg='black' color='white' borderRadius='base' p='1'>
                Guchi Center
              </Mark>

            </Heading>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}