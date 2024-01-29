"use client"

import { Box } from "@mui/material"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { useState } from "react"

export default function ProfilePic({
  src,
  alt = "profile",
  width = 45,
  height = 45,
}: {
  src: string
  alt?: string
  width?: number
  height?: number
}) {
  const [imgSrc, setImgSrc] = useState<string | StaticImport>(src)
  const handleError = () => {
    const defaultSrc = "/assets/image/profile.jpeg"
    setImgSrc(defaultSrc)
  }
  return (
    <Box
      sx={{
        overflow: "hidden",
        borderRadius: "100%",
        width: width,
        height: height,
      }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onError={handleError}
      />
    </Box>
  )
}
