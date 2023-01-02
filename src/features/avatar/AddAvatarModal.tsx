import { useDisclosure, Text, IconButton, Modal, ModalOverlay, ModalContent, Button, ModalBody, ModalHeader, Stack, Input, Wrap, VStack, HStack, Mark, Box } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { ImagePreview } from "../../components/ImagePreview"
import { addAvatar, Avatar } from "./avatarSlice"
import { useAppDispatch } from "../../app/hooks"
import { getImageUrlOnAwsS3, uploadFile } from "../../api/aws"

type Props = {
}

export const AddAvatarModal: FunctionComponent<Props> = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [file, setFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string>('')
    const [avatarForm, setAvatarForm] 
        = useState<Omit<Avatar, 'imageUrl' | 'avatarId'>>({
            avatarName:'',
            avatarText:'',
            color: ''
        })
    /** formのうち指定したプロパティを変更する */
    const handleChange = (input: keyof Avatar) => 
        (e: React.ChangeEvent<HTMLInputElement>)  => {
            setAvatarForm({...avatarForm, [input]: e.target.value})
    }
    const fileInputRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!file) return
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            const res = fileReader.result
            if (res && typeof res === 'string') {
                console.log(`res:`,res)
                setImageUrl(res)
            }
        }
        fileReader.readAsDataURL(file)

    }, [file])


    const onClickFileUploadButton = () => {
        fileInputRef.current?.click()
    }

    const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        setFile(event.target.files[0])
    }

    const onClickAddAvatar = async () => {
        // アバター画像をS3にアップロードする
        let key = ""
        if (file) {
            key = await uploadFile(file)
        }
        const imageUrl = getImageUrlOnAwsS3(key)
        const avatar:Avatar = {...avatarForm, imageUrl: imageUrl}
        dispatch(addAvatar(avatar))
        onClose()
    }

    return (
        <>
            {/* アバター追加ボタン */}
            <IconButton
                onClick={() => onOpen()}
                marginLeft={"-10px"}
                size={"md"}
                aria-label="Add avatar"
                icon={<AddIcon fontWeight={"extrabold"}></AddIcon>}
                borderRadius={"50%"}
                border={"2px solid gray"}>
            </IconButton>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay></ModalOverlay>
                <ModalContent width={'90%'}>
                    <ModalHeader textAlign={"center"}>
                        <VStack>
                            <Text>アバター新規追加</Text>
                        </VStack>
                        <HStack justifyContent={'flex-end'}>
                            <Button 
                                onClick={() => onClickAddAvatar()}
                                colorScheme={'teal'}>登録</Button>
                        </HStack>
                    </ModalHeader>
                    <ModalBody>
                        <Stack spacing={3}>
                            <Input 
                                placeholder="アバター名"
                                onChange={handleChange('avatarName')}/>
                            <Input 
                                placeholder="語尾(例:なのよ)"
                                onChange={handleChange('avatarText')}/>
                            <HStack>
                                <Box width={"50%"}>
                                    <Text marginLeft={"5"} fontWeight={"bold"}>
                                        色を選択
                                    </Text>
                                </Box>
                                <Input
                                    type={"color"}
                                    onChange={handleChange("color")}
                                />
                            </HStack>
                            <ImagePreview 
                                imageUrl={imageUrl}
                                setImageUrl={setImageUrl}
                                color={avatarForm.color}
                                ></ImagePreview>
                            <Wrap display={"flex"} justifyContent={"center"}>
                                <Button onClick={() => onClickFileUploadButton()}>
                                    ファイルを選択
                                </Button>
                                <Input 
                                    onChange={(e) => onChangeFileInput(e)} 
                                    ref={fileInputRef} 
                                    type="file" 
                                    accept="image/*"
                                    hidden/>
                            </Wrap>

                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}