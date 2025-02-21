import React from "react";
import { Textarea } from "@/components/ui/textarea";

function AdditionalReq({ additionalRequirementInput }) {
  return (
    <div className="mt-8">
      <label className="text-gray-400 font-semibold">
        Add your Additional Requirements{" "}
        <span className="text-black"> (It is optional)</span>
      </label>
      <Textarea onChange={(event) => additionalRequirementInput(event.target.value)} className="mt-5" />
    </div>
  );
}

export default AdditionalReq;
