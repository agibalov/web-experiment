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
* Routing seems to be broken to some degree - weird things happen with trailing slashes in URLs:
  * When running in dev mode, if you navigate to "Project One", the address bar will show `/projects/project-one` (no trailing slash). Now, if you refresh the page, the address bar shows `/projects/project-one/` (with trailing slash). 
  * Try the same scenario when running using Docker Compose, the behavior is different: you go to `/project-one`, Nginx responds with 301 `/project-one/`, but then Gatsby's routing is applied, and address bar shows `/project-one` again.
  * When running on Docker Compose, go to About. Address bar shows `/about`. Refresh the page Address bar shows `/about/`.
