import * as React from "react"
import Layout from '../components/layout';

const pageStyles = {
    color: "#232129",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
}

const NotFoundPage = () => {
    return (
        <Layout style={pageStyles}>
            <title>Not found</title>
            <h1 style={headingStyles}>Page not found</h1>
        </Layout>
    )
}

export default NotFoundPage
