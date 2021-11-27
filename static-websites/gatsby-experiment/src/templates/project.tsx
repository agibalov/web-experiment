import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/layout';

function ProjectTemplate(props) {
    const project = props.data.allProjectsYaml.edges[0].node
    return (
        <Layout>
            <title>{project.name}</title>
            <p>This is project {project.name}</p>
        </Layout>
    )
}

export default ProjectTemplate

export const pageQuery = graphql`
    query($projectId: String!) {
        allProjectsYaml(filter: {projectId: {eq: $projectId}}) {
            edges {
                node {
                    projectId
                    name
                }
            }
        }
    }
`
