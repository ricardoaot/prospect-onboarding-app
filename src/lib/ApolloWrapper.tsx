"use client";

import { ReactNode, useState, useEffect } from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    ApolloLink,
    NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';


// Function to securely access the token on the client
const getAuthToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
};

// Create Apollo Client
const createApolloClient = (token: string | null) => {
    // Link to add authorization
    const authLink = setContext((_, { headers }) => ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    }));

    // Link to add preflight headers to avoid CSRF blocks
    const preflightLink = setContext((_, { headers }) => ({
        headers: {
            ...headers,
            "Apollo-Require-Preflight": "true",
            "x-apollo-operation-name": "upload",
        },
    }));

    // Link for debugging
    const logLink = new ApolloLink((operation, forward) => {
        console.log("GraphQL Operation:", operation);
        console.log("Headers before send:", operation.getContext().headers);
        return forward(operation);
    });

    // Link for upload management
    const uploadLink = createUploadLink({
        uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
    });

    return new ApolloClient<NormalizedCacheObject>({
        link: ApolloLink.from([
            preflightLink,
            authLink,
            logLink,
            uploadLink
        ]),
        cache: new InMemoryCache(),
    });
};


// ApolloWrapper component to wrap the application
export default function ApolloWrapper({ children }: { children: ReactNode }) {
    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);

    useEffect(() => {
        const token = getAuthToken();
        setClient(createApolloClient(token));
    }, []);

    // Wait until the Apollo client is ready
    if (!client) return null;

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
