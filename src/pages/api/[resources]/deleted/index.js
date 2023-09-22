import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { getToken } from "next-auth/jwt";
import definitionsForResources from "@/config/definitions";
import ALL_ROLES from "@/constants/roles";
import { modifyWithdefinitionsArray } from "@/utils/dataConvert/DataConvert";

const get = async (group, resources, token, definitions, res) => {
  if (group !== ALL_ROLES.FACULTY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("GET for deleted");
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/deleted/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer   ${token}`,
    },
  });
  console.log("GET for deleted completed");

  let { data, errors } = await result.json();

  //iterate over the data and add the definitions
  if (data) {
    // modifyWithdefinitionsArray(data, definitions);
  }
  return res.status(result.status).json({ data, errors });
};

export default async function userResourses(req, res) {
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
    return await get(group, resources, token, definitions, res);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
