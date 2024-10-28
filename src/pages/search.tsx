import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"



const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p>asdasdasd</p>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Search Page</title>
