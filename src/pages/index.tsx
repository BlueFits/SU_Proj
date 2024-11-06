import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import SearchInput from "../components/SearchInput/SearchInput";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <section className="flex justify-center items-center h-screen flex-col">
      <div className="w-4/5 md:flex md:justify-center md:items-center flex-col text-center">
        <SearchInput enableText />
      </div>
    </section>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
