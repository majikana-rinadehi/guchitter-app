import { Box, Text, useDisclosure } from "@chakra-ui/react"
import React, { FunctionComponent, useRef } from "react"
import { useAppDispatch, useGetElementProperty } from "../app/hooks"
import { deleteComplaint } from "../features/complaint/complaintSlice"
import { RightClickModal, Handles, Props as ModalProps } from "./RightClickModal"

type Props = {
  /** 吹き出しテキスト */
  text?: string,
  /** 吹き出し背景色 */
  bgColor?: string
  /** complaintId */
  complaintId?: string
}

export const Fukidashi: FunctionComponent<Props> = (props) => {

  // 子コンポーネントのインスタンスに、`ref`を介してアクセスする
  const modalRef = useRef<Handles>(null)

  const fukidashiRef = useRef(null)
  // 吹き出しの位置を取得する
  const getElementProperty = useGetElementProperty(fukidashiRef)
  const dispatch = useAppDispatch()

  /** 吹き出しを右クリック時 */
  const onContextMenu = (event: React.MouseEvent) => {
    // デフォルトの右クリックメニューを表示しない
    event.preventDefault()

    console.log('right clicked')
    modalRef.current?.openModal()
  }

  /** 右クリックメニューで削除押下時 */
  const onClickDelete = () => {
    // TODO implement this method
    console.log('delete')
    console.log(`props.complaintId:`, props.complaintId)
    if (props.complaintId != undefined && props.complaintId != null) {
      dispatch(deleteComplaint(props.complaintId))
    }
  }

  return (
    <>
      {/* 右クリック時表示メニュー */}
      <RightClickModal
        ref={modalRef}
        top={getElementProperty('top') - 30}
        onClickDelete={onClickDelete}
      />
      <Box
        ref={fukidashiRef}
        onContextMenu={(e) => onContextMenu(e)}
        position={'relative'}
        w={'290px'}
        minH={'50'}
        paddingLeft={3}
        textAlign={'left'}
        borderRadius={'2xl'}
        backgroundColor={props.bgColor ? props.bgColor : 'pink.500'}
        _after={{
          content: '""',
          position: 'absolute',
          top: '5px',
          right: '-19px',
          border: '8px solid transparent',
          borderLeft: `18px solid ${props.bgColor}`,
          transform: 'rotate(-15deg)'
        }}
      >
        <Text fontStyle={'italic'} color={'white'}> {props.text} </Text>
      </Box>
    </>
  )
}