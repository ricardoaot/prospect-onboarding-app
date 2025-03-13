import ProspectComponent from "@/components/ProspectList/ProspectComponent";
import {getProspects} from "@/components/ProspectList/ProspectListQueries";
import { Suspense } from "react";

export default async function OnboardingForm() {

  const prospects = await getProspects(["pending"])

  return (
    <div style={{ maxWidth: 1200, margin: 'auto' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <ProspectComponent prospectList={prospects} />
      </Suspense>
    </div>
  );
}
