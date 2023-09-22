import definitionsForResources from "@/config/definitions";
import { DJANGO_BASE_URL } from "@/constants/endPoints";
import {
  convertdefinitionsBack,
  modifyWithdefinitionsArray,
} from "@/utils/dataConvert/DataConvert";
import { getToken } from "next-auth/jwt";

const get = async (group, resources, token, definitions, res) => {
  let result = await fetch(`${DJANGO_BASE_URL}/${resources}/definitions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let { data, errors } = await result.json();
  return res.status(result.status).json({ data, errors });
  // return { data, errors };
};

export default async function userResources(req, res) {
  // const { searchParams } = new URL(req.url);
  // const resources = searchParams.get("resources");
  const { resources } = req.query;
  const { user } = await getToken({ req });
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = user.access;
  const group = user.user.groups[0];

  if (req.method === "GET") {
    return await get(group, resources, token, definitions, res);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
