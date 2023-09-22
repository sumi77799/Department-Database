import { errorDecoder } from "@/utils/errorDecoder/errorDecoder";

export const deleteData = async (id, resources, type) => {
  switch (type) {
    case "Draft":
      type = "draft";
      break;
    default:
      type = "id";
      break;
  }

  const result = await fetch(`/api/${resources}/${type}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data, errors } = await result.json();

  return { data, errors: errorDecoder(errors) };
};
