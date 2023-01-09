import { Image, Box, UseImageProps } from "@chakra-ui/react"
import { FunctionComponent } from "react"
import Nino from '../static/Nino.jpeg'

type Props = {
    crossOrigin: UseImageProps["crossOrigin"]
    imageUrl?: string
    width: string
    height: string
}

/** `crossOrigin`プロパティを使用可能なアバター画像コンポーネント */
export const CustomAvatar: FunctionComponent<Props> = (props) => {

    return (
        <>
            <Box
                borderRadius={"full"}
                {...props}
            >
                <Image
                    crossOrigin={"anonymous"}
                    src={props.imageUrl ? props.imageUrl : Nino}
                    borderRadius={"full"}
                    objectFit={"cover"}
                    width={"100%"}
                    height={"100%"}
                />
            </Box>
        </>
    )
}