import { useDisclosure, Text, Modal, ModalOverlay, ModalContent, Button, ModalBody, ModalHeader, Stack, VStack, HStack, Box, Heading, Flex, Checkbox } from "@chakra-ui/react"
import { forwardRef, useImperativeHandle, ForwardRefRenderFunction, useState } from "react"
import { avatarSelector, deleteAvatar } from "./avatarSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { CustomAvatar } from "../../components/CustomAvatar"
import { Card, CardBody, CardHeader } from "@chakra-ui/card"
import { InfoIcon } from '@chakra-ui/icons'

// 親コンポーネントに公開するメソッドのインターフェース
export type Handles = {
    openModal: () => void
}

export type Props = {
}

/** アバター管理モーダル */
const ManageAvatarModalComponent: ForwardRefRenderFunction<Handles, Props> = (props, ref) => {

    const [selectedAvatarIds, setSelectedAvatarIds] = useState<string[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const avatarList = useAppSelector(avatarSelector)
    const avatarStatus = useAppSelector(state => state.avatar.status)
    const dispatch = useAppDispatch()

    // 親コンポーネントから呼ばれるメソッド
    useImperativeHandle(ref, () => ({
        openModal() {
            console.log('openModal')
            onOpen()
        }
    }))

    const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>, avatarId: string) => {
        console.log('e.target.checked', e.target.checked)
        if (e.target.checked) {
            setSelectedAvatarIds([...selectedAvatarIds, avatarId])
        } else {
            const index = selectedAvatarIds.findIndex(v => v === avatarId)
            if (index !== -1) {
                setSelectedAvatarIds(
                    selectedAvatarIds.filter(v => v !== avatarId)
                )
            }
        }
    }

    const onClickDeleteAvatar = () => {
        console.log(selectedAvatarIds)
        selectedAvatarIds.forEach(avatarId => dispatch(deleteAvatar(avatarId)))
    }

    const AvatarList = (
        avatarList.map(avatar => {
            return (
                <Card>
                    <CardBody>
                        <Flex gap={4}>
                            <CustomAvatar
                                crossOrigin="anonymous"
                                imageUrl={avatar.imageUrl}
                                height={"3rem"}
                                width={"3rem"}
                            />
                            <Box>
                                <Heading size='sm'>{avatar.avatarName}</Heading>
                                <Text>{avatar.avatarText}</Text>
                            </Box>
                            <Checkbox
                                marginLeft={"auto"}
                                onChange={(e) => onChangeCheckBox(e, avatar.avatarId!)}
                            />
                        </Flex>
                    </CardBody>
                </Card>
            )
        })
    )

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay></ModalOverlay>
                <ModalContent width={'90%'}>
                    <ModalHeader textAlign={"center"}>
                        <VStack>
                            <Text>アバター管理</Text>
                        </VStack>
                        <HStack justifyContent={'flex-end'}>
                            <Button
                                onClick={() => onClickDeleteAvatar()}
                                colorScheme={'teal'}>削除</Button>
                        </HStack>
                    </ModalHeader>
                    <ModalBody>
                        {
                            avatarList.length > 0
                                ? (
                                    <Stack spacing={3}>
                                        {AvatarList}
                                    </Stack>

                                )
                                : (
                                    <Card
                                        padding={3}
                                        size={"lg"}
                                        borderRadius={"2xl"} 
                                        backgroundColor="lightgray">
                                        <CardHeader>
                                            <Flex justifyContent={"center"}>
                                                <InfoIcon/>
                                            </Flex>
                                        </CardHeader>
                                        <CardBody>
                                            <Text
                                                textAlign={"center"} 
                                                fontWeight={"bold"}
                                                >
                                                アバターがいません!
                                            </Text>
                                        </CardBody>
                                    </Card>
                                )
                        }

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export const ManageAvatarModal = forwardRef(ManageAvatarModalComponent)