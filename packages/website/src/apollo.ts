import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : process.env.REACT_APP_SERVER_URL,
  cache: new InMemoryCache(),
  credentials: "include",
});