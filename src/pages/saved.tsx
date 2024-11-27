import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import { Container, Typography } from "@mui/material"

const pageStyles = {
    padding: "96px",
}
const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
}

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <Container style={pageStyles}>
            <Typography variant="h1" style={headingStyles}>Page is still under development</Typography>
            <Typography>
                Sorry 😔, this feature is not ready yet stay tuned.
            </Typography>
        </Container>
    )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
