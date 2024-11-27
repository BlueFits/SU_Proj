import React from 'react'
import { Empty, EmptyImage } from 'keep-react'
import { Typography } from '@mui/material'

export const EmptyComponent = () => {
    return (
        <Empty>
            <EmptyImage>
                <img
                    src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
                    height={234}
                    width={350}
                    alt="404"
                />
            </EmptyImage>
            <Typography className="mb-[14px] mt-5">Sorry, No result found!</Typography>
        </Empty>
    )
}
