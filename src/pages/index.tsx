import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import SearchInput from "../components/SearchInput/SearchInput";



const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SearchInput />
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
