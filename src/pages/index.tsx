import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import SearchInput from "../components/SearchInput/SearchInput";
import { Typography } from "@mui/material";



const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="w-4/5">
        <SearchInput />
      </div>
      <Typography className="mt-5 text-[gray]" variant="caption">SU v1.0.0</Typography>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
