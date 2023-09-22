import { DJANGO_EMAIL } from "@/constants/endPoints";

export default async function email(req, res) {
  // check if the request is a not a post request
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Bad Request" });
  }
  // get the email from the request body and send it to the server
  const { email } = req.body;
  // check if the email is not present
  if (!email) {
    return res.status(400).json({ error: "Bad Request" });
  }
  // console.log(email);

  // TODO: validate email

  const res_server = await fetch(DJANGO_EMAIL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await res_server.json();
  console.log("email sent to server: ", data, res_server.status);

  if (res_server.status === 200) {
    if (data.email[0] === "Enter a valid email address.") {
      return res.status(400).json({ error: "Enter a valid email address." });
    }
    return res.status(200).json({ message: "email sent" });
  }
  return res.status(400).json({ error: data.error });
}
