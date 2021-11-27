import * as React from "react"
import Layout from '../components/layout';

const pageStyles = {
    color: "#ff0000",
    border: "1px solid green",
}

const AboutPage = () => {
    return (
        <Layout style={pageStyles}>
            <title>About</title>
            <p>this is the about page</p>
        </Layout>
    )
}

export default AboutPage
