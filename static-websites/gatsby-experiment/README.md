# gatsby-experiment

A Gatsby hello world.

## Prerequisites

* NodeJS and NPM

## How to run

* `npm start` to start in development mode.
  * http://localhost:8000 for the website
  * http://localhost:8000/__graphql for GraphQL explorer
* `npm run-script build` to build. Results will appear under `/public`.
* `npm run-script clean` to delete all caches.
* `docker-compose up --build` to build, and serve using Nginx. The website will be available at http://localhost:8080

## Notes

* `npm run-script build` generates a bunch of files I don't understand: there are a few JS files and a `/public/page-data` directory.
* `gatsby-node.js` the [suggested](https://www.gatsbyjs.com/docs/recipes/sourcing-data/) `createPages` implementation looks very immature (if errors, then log).
