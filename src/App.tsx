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
  Text} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"
import { Fukidashi } from "./components/Fukidashi"
import { avatarList } from "./data/AvatarList"
import { convert } from "./util/TextConverter"
import { addComplaint, fetch, complaintSelector } from "./features/complaint/complaintSlice"
import { useAppDispatch, useAppSelector, useGetElementProperty } from "./app/hooks"
import { ScreenShotModal } from "./components/ScreenShotModal"

export const App = () => {

  // State/Ref
  const [complaintText, setComplaintText] = useState('')
  const [selectedAvatarId, setSelectedAvatarId] = useState('1')
  const [isAutoConvert, setIsAutoConvert] = useState(true)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const complaintAreaRef = useRef(null)
  const scrollTopRef = useRef<HTMLDivElement>(null)
  const scrollButtomRef = useRef<HTMLDivElement>(null)

  // hooks
  /** スクロール画面の上端の位置を取得する */
  const getElementPropertyTop = useGetElementProperty(scrollTopRef)
  /** スクロール画面の下端の位置を取得する */
  const getElementPropertyButtom = useGetElementProperty(scrollButtomRef)
  const complaintList = useAppSelector(complaintSelector)
  const complaintStatus = useAppSelector(state => state.complaint.status)
  const dispatch = useAppDispatch()

  const placeHolder = '(ΦωΦ)ぐちを入力してください(ΦωΦ)'
  const selectedAvatarSuffix = avatarList.find(avatar => avatar.id === selectedAvatarId)!.suffix
  const selectedAvatarColor = avatarList.find(avatar => avatar.id === selectedAvatarId)?.color

  // useLayoutEffect(() => {
  useEffect(() => {
    console.log('complaintStatus:',complaintStatus)
    if (complaintStatus === 'idle') {
      dispatch(fetch())
    }
    // 初期表示/愚痴ボタン押下時、最新のぐちが表示されるようスクロールする。
    // false の場合、要素の下端がスクロール可能祖先の表示範囲の下端に来るようにスクロールします。
    scrollButtomRef.current?.scrollIntoView(false)
  }, [complaintStatus])

  const onClickComplaintButton = () => {
    if (complaintText == '') return
    dispatch(addComplaint({
      complaintText: isAutoConvert ? convert(complaintText, selectedAvatarSuffix) : complaintText,
      avatarId: selectedAvatarId
    }))
    setComplaintText('')
    textAreaRef.current!.value = ''
  }

  const onClickAvatar = (avatarId: string) => {
    setSelectedAvatarId(avatarId)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <HStack justifyContent={'flex-end'}>
          <ScreenShotModal 
            captureRef={complaintAreaRef} 
            captureHeight={
              // HACK: 微妙にスクショ高さが足りないんだよ-
              // スクロールの下端の相対位置(top) - スクロールの上端の相対位置(top) + 72
              getElementPropertyButtom("top") - getElementPropertyTop("top") + 72
            }
            />
          <ColorModeSwitcher mr={'2'}></ColorModeSwitcher>
        </HStack>
        <Grid gridTemplateRows={'3fr 1.5fr 1fr'} minH="90vh" p={3}>
          <Box
            ref={complaintAreaRef}
            // position={'relative'}
            height={'300px'} overflowY={'scroll'}
            justifyContent={'flex-end'} mt={'5'} rowGap={4}
            // boxShadowのプロパティ
            // x方向offset, y方向offset, ぼかし, 広がり, 色, inset
            boxShadow={'0 1.5em 1em -1em rgb(109 101 101) inset'}
          >
            {/* スクロール画面の上端 */}
            <div ref={scrollTopRef}></div>
            {
              Array.isArray(complaintList)
                ?
                complaintList.map((complaint, key) => {
                  const avatarUrl = avatarList.find(avatar => avatar.id === complaint.avatarId)?.url
                  const avatarColor = avatarList.find(avatar => avatar.id === complaint.avatarId)?.color
                  return (
                    <Flex key={key} mt={5} gap={3}>
                      <Fukidashi key={key} bgColor={avatarColor} text={complaint.complaintText} />
                      <Avatar name="NH" src={avatarUrl} />
                    </Flex>
                  )
                })
                :
                null
            }
            {/* スクロール画面の下端 */}
            <div ref={scrollButtomRef}></div>
          </Box>
          <VStack justifyContent={'flex-end'} pb={4}>
            <Textarea
              outline={`solid 5px ${selectedAvatarColor}`}
              ref={textAreaRef}
              onChange={(e) => setComplaintText(e.target.value)}
              placeholder={placeHolder} />
            <Flex width={'300px'} alignItems={'center'}>
              <Button onClick={() => onClickComplaintButton()} mr={'auto'}>
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
                Complaint Center
              </Mark>
            </Heading>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}