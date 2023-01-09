import { Image, IconButton, VStack } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import { FunctionComponent, useEffect, useState } from "react"

type Props = {
    imageUrl: string
    setImageUrl: (url: string) => void
    color: string
}

export const ImagePreview: FunctionComponent<Props> = (props) => {

    return (
        <>
            {
                props.imageUrl
                ? (
                    <VStack spacing={3}>
                        <IconButton 
                            onClick={() => props.setImageUrl('')}
                            icon={<CloseIcon />} 
                            aria-label={"Close image preview"}
                            width={'20%'}/>
                        <Image 
                            maxHeight={'xl'} 
                            border={`10px solid ${props.color}`} 
                            src={props.imageUrl}/>
                    </VStack>
                    
                )
                : null
            }
        </>
    )
}