import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import SearchInput from "../components/SearchInput/SearchInput";
import { Typography } from "@mui/material";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <section className="flex mt-[250px] items-center flex-col">
      <div className="w-4/5 md:flex md:justify-center md:items-center flex-col text-center">
        <SearchInput enableText />
      </div>
    </section>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>SelectU Home- Search for a program based on your grades</title>
