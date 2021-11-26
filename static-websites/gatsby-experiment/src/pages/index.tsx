import * as React from "react"
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

const pageStyles = {
    color: "#ff0000",
    border: "1px solid green",
}

const IndexPage = ({data}) => {
    return (
        <Layout style={pageStyles}>
            <title>Home Page</title>

            <h1>Projects</h1>
            <p>These come from *.yaml files</p>
            <ul>
                {data.allProjectsYaml.edges.map(({node}) => (
                    <li key={node.projectId}>
                        <Link to={`/projects/${node.projectId}`}>{node.name}</Link>
                        {' '}
                        ({node.projectId})
                    </li>
                ))}
            </ul>

            <h1>Interests</h1>
            <p>These come from sourceNodes in gatsby-node.js</p>
            <ul>
                {data.allInterest.edges.map(({node}) => (
                    <li key={node.interestId}>{node.name} ({node.description})</li>
                ))}
            </ul>

            <h1>Posts</h1>
            <p>These come from *.md files</p>
            <ul>
                {data.allMarkdownRemark.edges.map(({node}) => (
                    <li key={node.id}>
                        <Link to={node.frontmatter.slug}>{node.frontmatter.title}</Link>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export default IndexPage

export const pageQuery = graphql`
    query {
        allProjectsYaml {
            edges {
                node {
                    projectId
                    name                    
                }
            }
        }
        
        allInterest {
            edges {
                node {
                    interestId
                    name
                    description
                }
            }
        }
        
        allMarkdownRemark {
            edges {
                node {
                    frontmatter {
                        slug
                        title
                    }
                    id
                    html
                }
            }
        }
    }
`
