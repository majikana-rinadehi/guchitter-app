import { Box, Button, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { 
    forwardRef, 
    useImperativeHandle, 
    ForwardRefRenderFunction } 
from "react"

// 親コンポーネントに公開するメソッドのインターフェース
export type Handles = {
    openModal: () => void
}

export type Props = {
    top: number
    onClickDelete: () => void
}

// 参考: https://qiita.com/sugasaki/items/c541a95754905f423fbd
const RightClickModalComponent: ForwardRefRenderFunction<Handles,Props> = (props, ref) => {

    const {isOpen, onOpen, onClose} = useDisclosure()

    // 親コンポーネントから呼ばれるメソッド
    useImperativeHandle(ref, () => ({
        openModal() {
            console.log('openModal')
            onOpen()
        }
    }))

    /** 削除ボタン押下時 */
    const onClickDelete = () => {
        onClose()
        props.onClickDelete()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {/* 透明なオーバーレイ */}
            <ModalOverlay bg={"blackAlpha.0"}/>
            <ModalContent
                top={props.top}
                left={10}
                width={"fit-content"}
                borderRadius={"10rem"}
                >
                <ModalBody
                    borderRadius={"10rem"}
                    bg={"gray.600"}>
                    <Box>
                        <Button 
                            onClick={() => onClickDelete()}
                            fontSize={"1rem"}
                        >削除</Button>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export const RightClickModal = forwardRef(RightClickModalComponent)