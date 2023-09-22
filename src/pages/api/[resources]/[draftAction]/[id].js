import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { getToken } from "next-auth/jwt";
import definitionsForResources from "@/config/definitions";
import { convertdefinitionsBack } from "@/utils/dataConvert/DataConvert";

const put = async (
  group,
  resources,
  token,
  definitions,
  res,
  req,
  id,
  draftAction
) => {
  let jsonBody = convertdefinitionsBack(req.body, definitions, resources);
  console.log("jsonBody:", jsonBody);
  console.log(`${DJANGO_BASE_URL}/${resources}/${draftAction}/${id}/`);
  // const result;
  if (group === "Faculty") {
    const result = await fetch(
      `${DJANGO_BASE_URL}/${resources}/${draftAction}/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jsonBody),
      }
    );
    const { data, errors } = await result.json();
    return res.status(result.status).json({ data, errors });
  } else return res.status(401).json({ message: "Unauthorized" });
};

export default async function drafts(req, res) {
  // check if the request is a not a GET request
  //TODO: add token verification

  const { resources, draftAction, id } = req.query;
  console.log(resources, draftAction, id);
  const { user } = await getToken({ req });
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const token = user.access;
  const group = user.user.groups[0];

  const definitions = definitionsForResources[resources];

  if (req.method === "PUT") {
    return await put(
      group,
      resources,
      token,
      definitions,
      res,
      req,
      id,
      draftAction
    );
  } else return res.status(405).json({ error: "Method not Allowed" });
}
