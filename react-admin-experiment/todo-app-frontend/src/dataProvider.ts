import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-simple';

export const dataProvider = buildGraphQLProvider({ 
  buildQuery, 
  clientOptions: {
    uri: "http://localhost:8000/graphql"
  }
});
