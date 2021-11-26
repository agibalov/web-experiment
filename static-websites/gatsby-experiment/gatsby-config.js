module.exports = {
    siteMetadata: {
        siteUrl: "https://www.yourdomain.tld",
        title: "Gatsby Experiment",
    },
    plugins: [
        "gatsby-plugin-sass",

        "gatsby-transformer-yaml",
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `projects`,
                path: `${__dirname}/src/projects`,
            },
        },

        "gatsby-transformer-remark",
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/src/posts`,
            },
        },
    ],
};
