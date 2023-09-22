import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { getToken } from "next-auth/jwt";

const post = async (token, req, res) => {
  console.log(JSON.stringify(req.body));
  console.log("url: ", `${DJANGO_BASE_URL}/notifications/broadcast/`);
  const result = await fetch(`${DJANGO_BASE_URL}/notifications/broadcast/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: req.body,
  });
  const { data, error } = await result.json();

  return res.status(result.status).json({ data, errors: error });
};

export default async function userResources(req, res) {
  const { user } = await getToken({ req });
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = user.access;

  if (req.method === "POST") {
    return await post(token, req, res);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
