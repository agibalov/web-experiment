import * as React from "react"
import { graphql, Link } from 'gatsby';

const pageStyles = {
    color: "#ff0000",
    border: "1px solid green",
}

const IndexPage = ({data}) => {
    return (
        <main style={pageStyles}>
            <title>Home Page</title>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <h1>Projects</h1>
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
            <ul>
                {data.allInterest.edges.map(({node}) => (
                    <li key={node.interestId}>{node.name} ({node.description})</li>
                ))}
            </ul>
            <h1>Posts</h1>
            <ul>
                {data.allMarkdownRemark.edges.map(({node}) => (
                    <li key={node.id}>
                        <Link to={node.frontmatter.slug}>{node.frontmatter.title}</Link>
                    </li>
                ))}
            </ul>
        </main>
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
