import definitionsForResources from "@/config/definitions";
import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { modifyWithdefinitions } from "@/utils/dataConvert/DataConvert";

import { getToken } from "next-auth/jwt";

const put = async (group, resources, token, definitions, res, id) => {
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/restore/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer   ${token}`,
    },
  });
  let { data, errors } = await result.json();
  if (data) {
    // modifyWithdefinitions(data, definitions);
  }

  return res.status(result.status).json({ data, errors });
};

export default async function userResourses(req, res) {
  // check if the request is a not a GET request
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
    //TODO: add token verification
    return await put(group, resources, token, definitions, res, id);
    // return res.status(200).json(data);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
