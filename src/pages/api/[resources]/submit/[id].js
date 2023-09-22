import definitionsForResources from "@/config/definitions";
import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { modifyWithdefinitions } from "@/utils/dataConvert/DataConvert";

import { getToken } from "next-auth/jwt";

const put = async (group, resources, token, definitions, res, req, id) => {
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/submit/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(req.body),
  });
  let { data, errors } = await result.json();
  console.log("data:", data);
  console.log("errors:", errors);
  if (data) {
    // modifyWithdefinitions(data, definitions);
  }
  return res.status(result.status).json({ data, errors });
};

export default async function drafts(req, res) {
  // check if the request is a not a GET request
  //TODO: add token verification
  const { resources, id } = req.query;
  const { user } = await getToken({ req });
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = user.access;
  const group = user.user.groups[0];
  const definitions = definitionsForResources[resources];

  if (req.method === "PUT") {
    return await put(group, resources, token, definitions, res, req, id);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
