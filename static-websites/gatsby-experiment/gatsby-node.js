const path = require('path');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    const interests = [
        { interestId: 'programming', name: 'Programming', description: 'I like to write code' },
        { interestId: 'music', name: 'Music', description: 'I like to play music' }
    ];

    interests.forEach(interest => {
        actions.createNode({
            id: createNodeId(`Interest-${interest.interestId}`),
            interestId: interest.interestId,
            name: interest.name,
            description: interest.description,
            internal: {
                type: 'Interest',
                contentDigest: createContentDigest(interest)
            }
        });
    });
};

exports.createPages = async ({ actions, graphql }) => {
    const result = await graphql(`
        query {
            allProjectsYaml {
                edges {
                    node {
                        projectId
                        name                    
                    }
                }
            }
        }    
    `);
    if (result.errors) { // TODO: WTF? Seriously?
        console.error(result.errors);
    }

    result.data.allProjectsYaml.edges.forEach(({node}) => {
        actions.createPage({
            path: `projects/${node.projectId}`,
            component: path.resolve('src/templates/project.tsx'),
            context: {
                projectId: node.projectId
            }
        });
    });
};
