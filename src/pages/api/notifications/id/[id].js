import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { getToken } from "next-auth/jwt";

const del = async (token, res, id) => {
  const result = await fetch(`${DJANGO_BASE_URL}/notifications/viewed/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ notification_id: id }),
  });
  const { data, errors } = await result.json();

  return res.status(result.status).json({ data, errors });
};

export default async function userResources(req, res) {
  const { user } = await getToken({ req });
  const { id } = req.query;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = user.access;

  if (req.method === "DELETE") {
    return await del(token, res, id);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
