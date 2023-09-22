import { DJANGO_BASE_URL } from "@/constants/endPoints";

export default async function register(req, res) {
  // check if the request is a not a post request
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Bad Request" });
  }
  // get the email andK otp from the request body and send it to the server
  //   print req.body
  console.log(req.body);
  //   extract user role
  const { role } = req.body;
  console.log(`${DJANGO_BASE_URL}/user/${role.toLowerCase()}/register/`);
  //   check if the role is not present
  if (!role) {
    return res.status(400).json({ error: "Bad Request" });
  }

  //   send to server

  const result = await fetch(
    `${DJANGO_BASE_URL}/user/${role.toLowerCase()}/register/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );

  console.log(result.status, "----------------- res_server.status");

  const data = await result.json();
  console.log(data);

  return res.status(result.status).json(data);

  return res.status(200).json({ message: "otp verified" });
  return res.status(400).json({ error: data.error });
}
