import { errorDecoder } from "@/utils/errorDecoder/errorDecoder";

export const decisionData = async (decision, recources, id, formData) => {
  let type = decision;

  const result = await fetch(`/api/${recources}/${type}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData ?? {}),
  });
  const { data, errors } = await result.json();

  return { data, errors: errorDecoder(errors) };
};
