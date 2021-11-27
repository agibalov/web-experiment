import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout";

function PostTemplate(props) {
    const post = props.data.markdownRemark;
    return (
        <Layout>
            <title>{post.frontmatter.title}</title>
            <div dangerouslySetInnerHTML={{__html: post.html}}></div>
        </Layout>
    )
}

export default PostTemplate

export const pageQuery = graphql`
    query($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                slug
                title
            }
        }
    }
`
