import definitionsForResources from "@/config/definitions";
import { DJANGO_BASE_URL } from "@/constants/endPoints";

import { getToken } from "next-auth/jwt";

const get = async (req, res, group, token) => {
  if (group !== "Staff") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { slug = [], type } = req.query;
  const [departmentId, startDate, endDate] = slug;
  const url = `${DJANGO_BASE_URL}/reports/${type}/${departmentId}/${startDate}/${endDate}/`;

  // return res.status(200).json({ message: slug });

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return res.status(response.status).json(data);
};
// TODO: generate report query left

const post = async (req, res, group, token, department) => {
  if (group !== "Staff") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  console.log("In post");

  const { slug = [], type } = req.query;
  //post on /reports/dinfo directly
  let jsonBody = req.body;
  jsonBody["department"] = department;

  console.log("Data for dinfo report: ", JSON.stringify(jsonBody));
  const url = `${DJANGO_BASE_URL}/reports/${type}/`;
  const result = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.setHeader("Content-Disposition", "attachment; filename=dinfo.docx");

  res.end(Buffer.from(await result.arrayBuffer()));

  return;
};

export default async function reports(req, res) {
  // check if the request is a not a GET request
  console.log("In reports");
  const { user } = await getToken({ req });
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  console.log("user", user);
  const department = user.user.department;
  const token = user.access;
  const group = user.user.groups[0];
  console.log("group", group);
  console.log("token", token);
  console.log("department", department);
  console.log("req.method", req.method);
  // print slug
  console.log("req.query", req.query);
  if (req.method === "GET") {
    console.log("In get");
    return await get(req, res, group, token);
  } else if (req.method === "POST") {
    console.log("In post");
    return await post(req, res, group, token, department);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
