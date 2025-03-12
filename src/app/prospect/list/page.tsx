import ProspectComponent from "@/components/Prospect/ProspectComponent";
import {getProspects} from "@/components/Prospect/ProspectListQueries";

export default async function OnboardingForm() {

  const prospects = await getProspects(["pending"])

  return (
    <div style={{ maxWidth: 1200, margin: 'auto' }}>
      <ProspectComponent prospectList={prospects} />
    </div>
  );
}
