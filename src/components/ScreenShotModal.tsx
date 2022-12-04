import { Image, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { FunctionComponent, useState } from "react"
import * as htmlToImage from "html-to-image"

type Props = {
    /** キャプチャ領域のRef */
    captureRef: React.MutableRefObject<null>
}

export const ScreenShotModal: FunctionComponent<Props> = (props) => {

    const [captureURI, setCaptureURI] = useState('')
    const {isOpen, onOpen, onClose} = useDisclosure()

    const onClickScreenShotButton = async () => {
        // 参考
        // https://stackoverflow.com/questions/71190946/created-image-with-use-react-screenshot-is-incorrectly-rendered
        const node = props.captureRef.current
        if (!node) return
        const captureURI = await htmlToImage.toJpeg(node)
          .then(res => res)
          .catch(e => console.log(e))
        if (!captureURI) return
        setCaptureURI(captureURI)
        onOpen()
      }

    return (
        <>
            <Button onClick={() => onClickScreenShotButton()}>
                スクショ
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>スクショ</ModalHeader>
                    <ModalBody>
                        <Image src={captureURI} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>閉じる</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}