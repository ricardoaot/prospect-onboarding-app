import { request, gql } from "graphql-request";
import { Country } from "@/type";


const GET_COUNTRIES = gql`
  query {
    getCountries {
      id, 
      name, 
      hasUSD
    }
  }
`;

export const getCountries = async (): Promise<Country[]> => {
  try {
    const onboardingUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await request<{ getCountries: Country[] }>(
      `${onboardingUrl}/graphql`,
      GET_COUNTRIES
    );

    if (!response?.getCountries) {
      throw new Error("Unexpected response structure");
    }
    
    return response.getCountries

  } catch (error) {
    console.error("Error:", error);
    return []
  }
};