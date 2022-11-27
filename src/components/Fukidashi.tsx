import { Box, Text } from "@chakra-ui/react"
import { FunctionComponent } from "react"

type Props = {
    /** 吹き出しテキスト */
    text?: string,
    /** 吹き出し背景色 */
    bgColor?: string
}

export const Fukidashi: FunctionComponent<Props> = ( props ) => {
    return (
        <Box 
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
    )
}