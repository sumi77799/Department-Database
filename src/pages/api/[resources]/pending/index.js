import definitionsForResources from "@/config/definitions";
import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { modifyWithdefinitionsArray } from "@/utils/dataConvert/DataConvert";

import { getToken } from "next-auth/jwt";

const get = async (group, resources, token, definitions, res) => {
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/pending/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer   ${token}`,
    },
  });
  let { data, errors } = await result.json();
  if (data) {
    // modifyWithdefinitionsArray(data, definitions);
  }

  return res.status(result.status).json({ data, errors });
};

export default async function pendingRequests(req, res) {
  // check if the request is a not a GET request
  const { resources } = req.query;
  const { user } = await getToken({ req });
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = user.access;
  const group = user.user.groups[0];
  const definitions = definitionsForResources[resources];
  if (req.method === "GET") {
    //TODO: add token verification
    return await get(group, resources, token, definitions, res);
    // return res.status(200).json({ data, errors });
  } else return res.status(405).json({ error: "Method not Allowed" });
}
