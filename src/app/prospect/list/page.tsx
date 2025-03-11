import { request, gql } from "graphql-request";
import ProspectGrid from '@/components/Prospect/ProspectGrid';
import { Prospect } from '@/type/prospect';
import ProspectComponent from "@/components/Prospect/ProspectComponent";


const GET_PROSPECTS = gql`
  query {
    getProspects {
      id,
      name,
      lastname,
      email, 
      phone,
      birthday,
    }
  }
`;


export default async function OnboardingForm() {

  const getProspects = async (): Promise<Prospect[]> => {
    try {

      const response = await request<{ getProspects: Prospect[] }>(
        "http://localhost:3001/graphql",
        GET_PROSPECTS
      );

      if (!response?.getProspects) {
        throw new Error("Estructura de respuesta inesperada");
      }

      return response.getProspects

    } catch (error) {
      console.error("Error al guardar la información:", error);
      return []
    }
  };

  const prospects = await getProspects()

  return (
    <div style={{ maxWidth: 1200, margin: 'auto' }}>
      <ProspectComponent prospectList={prospects} />
    </div>
  );
}
