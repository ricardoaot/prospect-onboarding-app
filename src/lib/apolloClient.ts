import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
      fetchOptions: { cache: "no-store" }, // Para evitar cache en el servidor
    }),
  });