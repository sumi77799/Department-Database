import { DJANGO_BASE_URL } from "@/constants/endPoints";

import { getToken } from "next-auth/jwt";
import definitionsForResources from "@/config/definitions";
import { modifyWithdefinitions } from "@/utils/dataConvert/DataConvert";
// import { modifyWithdefinitions } from "@/utils/dataConvert/DataConvert";
// import { modifyWithdefinitions } from "@/utils/dataConvert/DataConvert";

const get = async (group, resources, id, token, definitions, res) => {
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let { data, errors } = await result.json();
  if (data && definitions) {
    data = modifyWithdefinitions(data, definitions);
  }
  //iterate over the data and add the definitions
  // console.log("data", data)
  return res.status(result.status).json({ data, errors });
  // return res.status(200).json(data);
};

const del = async (group, resources, token, definitions, res, id) => {
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer   ${token}`,
    },
  });
  const { data, errors } = await result.json();
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
  // console.log(definitionsForResources);
  const token = user.access;
  const group = user.user.groups[0];
  const definitions = definitionsForResources[resources];

  if (req.method === "GET") {
    //TODO: add token verification
    return await get(group, resources, id, token, definitions, res);
  } else if (req.method === "DELETE") {
    return await del(group, resources, token, definitions, res, id);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
