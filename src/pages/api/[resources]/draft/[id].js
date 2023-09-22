import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { getToken } from "next-auth/jwt";
import definitionsForResources from "@/config/definitions";
import {
  convertdefinitionsBack,
  modifyWithdefinitions,
} from "@/utils/dataConvert/DataConvert";

const get = async (group, resources, token, definitions, res, id) => {
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/draft/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer   ${token}`,
    },
  });
  let { data, errors } = await result.json();
  //Temporary details

  //iterate over the data and add the definitions

  if (data) {
    modifyWithdefinitions(data, definitions);
  }

  return res.status(result.status).json({ data, errors });
};

const put = async (group, resources, token, definitions, res, req, id) => {
  let jsonBody = convertdefinitionsBack(req.body, definitions, resources);
  // console.log("jsonBody:", jsonBody);
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/draft/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });
  let { data, errors } = await result.json();

  return res.status(result.status).json({ data, errors });
};

const del = async (group, resources, token, definitions, res, id) => {
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/draft/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let { data, errors } = await result.json();

  if (data) {
    // modifyWithdefinitions(data, definitions);
  }

  return res.status(result.status).json({ data, errors });
};

const post = async (group, resources, token, definitions, res, req, id) => {
  let jsonBody = convertdefinitionsBack(req.body, definitions, resources);
  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/draft/${id}/`, {
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

  if (req.method === "GET") {
    return await get(group, resources, token, definitions, res, id);
    // return res.status(200).json(data);
  } else if (req.method === "PUT") {
    return await put(group, resources, token, definitions, res, req, id);
  } else if (req.method === "DELETE") {
    return await del(group, resources, token, definitions, res, id);
  } else if (req.method === "POST") {
    return await post(group, resources, token, definitions, res, req, id);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
