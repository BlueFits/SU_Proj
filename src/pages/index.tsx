import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Button from '@mui/material/Button';


const IndexPage: React.FC<PageProps> = () => {
  return (
    <div><Button variant="contained">Hello world</Button></div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
