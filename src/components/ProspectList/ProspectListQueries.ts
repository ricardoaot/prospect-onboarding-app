import { request, gql } from "graphql-request";
import { Prospect } from '@/type/prospect';

export const QUALIFY_PROSPECT = gql`
mutation QualifyProspect (
  $id: String!,
  $status: String!,
) {
  qualifyProspect(
      id: $id, 
      status: $status
  )
}
`;

const GET_PROSPECTS = gql`
  query GetProspects(
    $statuses: [String!]
  ){
    getProspects(
      statuses:$statuses
    ) {
      id,
      name,
      lastname,
      email, 
      phone,
      status,
    }
  }
`;

export const getProspects = async (statuses: string[]): Promise<Prospect[]> => {
  try {
    const onboardingUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await request<{ getProspects: Prospect[] }>(
      `${onboardingUrl}/graphql`,
      GET_PROSPECTS,
      { statuses }
    );

    if (!response?.getProspects) {
      throw new Error("Unexpected response structure");
    }

    return response.getProspects

  } catch (error) {
    console.error("Error saving information:", error);
    return []
  }
};