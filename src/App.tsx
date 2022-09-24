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
  HStack,
  Switch,
  Text
} from "@chakra-ui/react"
import { useLayoutEffect, useRef, useState } from "react"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"
import { Fukidashi } from "./components/Fukidashi"
import { avatarList } from "./data/AvatarList"
import { convert } from "./util/TextConverter"
import { addGuchi, guchiSelector } from "./features/guchi/guchiSlice"
import { useAppDispatch, useAppSelector } from "./app/hooks"

export const App = () => {

  const [guchiText, setGuchiText] = useState('')
  const [selectedAvatarId, setSelectedAvatarId] = useState('1')
  const [isAutoConvert, setIsAutoConvert] = useState(true)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const scrollButtomRef = useRef<HTMLDivElement>(null)
  const guchiList = useAppSelector(guchiSelector)
  const dispatch = useAppDispatch()

  const placeHolder = '(ΦωΦ)ぐちを入力してください(ΦωΦ)'
  const selectedAvatarSuffix = avatarList.find(avatar => avatar.id === selectedAvatarId)!.suffix
  const selectedAvatarColor = avatarList.find(avatar => avatar.id === selectedAvatarId)?.color

  useLayoutEffect(() => {
    // 初期表示/愚痴ボタン押下時、最新のぐちが表示されるようスクロールする。
    // alignToTop
    // false の場合、要素の下端がスクロール可能祖先の表示範囲の下端に来るようにスクロールします。
    scrollButtomRef.current?.scrollIntoView(false)
  }, [guchiList])

  const onClickGuchiButton = () => {
    if (guchiText) {
      dispatch(addGuchi({
        guchiText: isAutoConvert ? convert(guchiText, selectedAvatarSuffix) : guchiText,
        avatarId: selectedAvatarId
      }))
    }
    textAreaRef.current!.value = ''
  }

  const onClickAvatar = (avatarId: string) => {
    setSelectedAvatarId(avatarId)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <HStack justifyContent={'flex-end'}>
          <ColorModeSwitcher mr={'2'}></ColorModeSwitcher>
        </HStack>
        <Grid gridTemplateRows={'3fr 1.5fr 1fr'} minH="90vh" p={3}>
          <Box
            height={'300px'} overflowY={'scroll'}
            justifyContent={'flex-end'} mt={'5'} rowGap={4}
            // boxShadowのプロパティ
            // x方向offset, y方向offset, ぼかし, 広がり, 色, inset
            boxShadow={'0 1.5em 1em -1em rgb(109 101 101) inset'}
          >
            {guchiList.map(guchi => {
              const avatarUrl = avatarList.find(avatar => avatar.id === guchi.avatarId)?.url
              const avatarColor = avatarList.find(avatar => avatar.id === guchi.avatarId)?.color
              return (
                <Flex mt={5} gap={3}>
                  <Fukidashi bgColor={avatarColor} text={guchi.guchiText} />
                  <Avatar name="NH" src={avatarUrl} />
                </Flex>
              )
            })}
            <div ref={scrollButtomRef}></div>
          </Box>
          <VStack justifyContent={'flex-end'} pb={4}>
            <Textarea
              outline={`solid 5px ${selectedAvatarColor}`}
              ref={textAreaRef}
              onChange={(e) => setGuchiText(e.target.value)}
              placeholder={placeHolder} />
            <Flex width={'300px'} alignItems={'center'}>
              <Button onClick={() => onClickGuchiButton()} mr={'auto'}>
                グチる
              </Button>
              <Box mr={'auto'}>
                <Switch 
                  onChange={(e) => setIsAutoConvert(e.target.checked)} 
                  id={'auto-convert'}
                  defaultChecked={true}
                  ></Switch>
                <Text fontSize={'xx-small'}>自動変換</Text>
              </Box>
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