import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  // check if the request is a not a GET request

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { user } = await getToken({ req });
  const token = user.access;

  const data = await fetch(`${DJANGO_BASE_URL}/department`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await data.json();

  return res.status(200).json(result);
}
