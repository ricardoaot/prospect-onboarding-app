import { gql } from "@apollo/client";
import { client } from "../../lib/apolloClient";
import { Prospect } from '@/type/prospect';

// Query to get prospects
export const GET_PROSPECTS = gql`
  query GetProspects($statuses: [String!]) {
    getProspects(statuses: $statuses) {
      id
      name
      lastname
      email
      phone
      status
      profilePhoto
    }
  }
`;

// Function to get prospects
export const getProspects = async (statuses: string[]): Promise<Prospect[]> => {
  try {
    const { data } = await client.query<{ getProspects: Prospect[] }>({
      query: GET_PROSPECTS,
      variables: { statuses },
      fetchPolicy: 'no-cache',
    });

    if (!data?.getProspects) {
      throw new Error("Unexpected response structure");
    }

    return data.getProspects;
  } catch (error) {
    console.error("Error getting prospects:", error);
    return [];
  }
};
