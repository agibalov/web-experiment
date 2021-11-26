import React from "react"
import { graphql } from "gatsby"

function ProjectTemplate(props) {
    const project = props.data.allProjectsYaml.edges[0].node
    return (
        <main>
            <title>{project.name}</title>
            <p>This is project {project.name}</p>
        </main>
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
