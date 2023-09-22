import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { getToken } from "next-auth/jwt";
import definitionsForResources from "@/config/definitions";
import {
  convertdefinitionsBack,
  modifyWithdefinitionsArray,
} from "@/utils/dataConvert/DataConvert";

const get = async (group, resources, token, definitions, res) => {
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/draft/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer   ${token}`,
    },
  });
  let { data, errors } = await result.json();

  // if (data) {
  //   data = modifyWithdefinitionsArray(data, definitions, resources);
  // }
  console.log("data from get of drafts-------------------" + data);
  console.log("datatype from get of drafts-------------------" + typeof data);
  // let errors = null;
  return res.status(result.status).json({ data, errors });
};

const post = async (group, resources, token, definitions, res, req) => {
  let jsonBody = convertdefinitionsBack(req.body, definitions, resources);

  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/draft/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });
  let { data, errors } = await result.json();
  return res.status(result.status).json({ data, errors });
};

export default async function drafts(req, res) {
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
  console.log("In  drafts-------------------");

  if (req.method === "GET") {
    console.log("In get of drafts-------------------");
    return await get(group, resources, token, definitions, res);
  } else if (req.method === "POST") {
    return await post(group, resources, token, definitions, res, req);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
