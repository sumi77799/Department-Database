import { DJANGO_BASE_URL } from "@/constants/endPoints";

import { getToken } from "next-auth/jwt";

const get = async (req, res, group, token, type) => {
  if (group !== "Staff") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const url = `${DJANGO_BASE_URL}/reports/${type}`;

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

export default async function reports(req, res) {
  // check if the request is a not a GET request
  const { user } = await getToken({ req });
  const { type } = req.query;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  console.log("user", user);
  const department = user.user.department;
  const token = user.access;
  const group = user.user.groups[0];
  if (req.method === "GET") {
    return await get(req, res, group, token, type);
    //   } else if (req.method === "POST") {
    // return await post(req, res, group, token, department);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
