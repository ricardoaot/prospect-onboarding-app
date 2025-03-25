import { gql } from "@apollo/client";
import { client } from "../../lib/apolloClient";
import { Country } from "@/type";

const GET_COUNTRIES = gql`
  query GetCountries {
    getCountries {
      id
      name
      hasUSD
    }
  }
`;

export const getCountries = async (): Promise<Country[]> => {
  try {
    const { data } = await client.query<{ getCountries: Country[] }>({
      query: GET_COUNTRIES,
      fetchPolicy: "no-cache", // Asegura que no use caché
    });

    return data.getCountries || [];
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
