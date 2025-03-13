import ProspectComponent from "@/components/ProspectList/ProspectComponent";
import { getProspects } from "@/components/ProspectList/ProspectListQueries";
import { Suspense } from "react";

export default async function OnboardingForm() {

  const prospects = await getProspects(["pending"])

  return (
    <div style={{ maxWidth: 1200, margin: 'auto' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <ProspectComponent prospectList={prospects} />
      </Suspense>
      <a
        href="/prospect/apply"
        className="px-6 py-3 text-xl font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Prospect Application
      </a>
    </div>
  );
}
