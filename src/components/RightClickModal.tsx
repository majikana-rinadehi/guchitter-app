import { Box, Button, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { 
    forwardRef, 
    useImperativeHandle, 
    ForwardRefRenderFunction } 
from "react"

// メソッドのインターフェースを公開する
export type Handles = {
    openModal: () => void
}

export type Props = {
    top: number
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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay opacity={1}/>
            <ModalContent
                top={props.top}
                left={10}
                width={100}
            >
                <ModalBody>
                    <Box>
                        <Button>削除</Button>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export const RightClickModal = forwardRef(RightClickModalComponent)