import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { getToken } from "next-auth/jwt";

const get = async (token, res) => {
  const result = await fetch(`${DJANGO_BASE_URL}/notifications/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const { data, errors } = await result.json();

  return res.status(result.status).json({ data, errors });
};

export default async function userResources(req, res) {
  const { user } = await getToken({ req });
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = user.access;

  if (req.method === "GET") {
    return await get(token, res);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
