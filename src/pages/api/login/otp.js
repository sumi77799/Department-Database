import { DJANGO_OTP } from "@/constants/endPoints";

export default async function otp(req, res) {
  // check if the request is a not a post request
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Bad Request" });
  }
  // get the email and otp from the request body and send it to the server
  const { email, otp } = req.body;
  // check if the email is not present
  if (!email || !otp) {
    return res.status(400).json({ error: "Bad Request" });
  }
  // console.log(email, otp);

  // TODO: validate email and otp

  const res_server = await fetch(DJANGO_OTP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });
  if (res_server.status === 204) {
    return res.status(400).json({ error: "otp expired or invalid" });
  }
  console.log(res_server.status, "----------------- res_server.status");
  const data = await res_server.json();
  // console.log(data);

  if (res_server.status === 200) {
    // send details to the client
    return res.status(200).json({
      message: "otp verified",
      ...data,
    });
  }
  return res.status(400).json({ error: data.error });
}
