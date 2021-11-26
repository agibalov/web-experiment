import React from "react"
import { graphql } from "gatsby"

function PostTemplate(props) {
    const post = props.data.markdownRemark;
    return (
        <main>
            <title>{post.frontmatter.title}</title>
            <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </main>
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
