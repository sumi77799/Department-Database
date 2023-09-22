import definitionsForResources from "@/config/definitions";
import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { STAFF } from "@/constants/roles";
import {
  convertdefinitionsBack,
  modifyWithdefinitionsArray,
} from "@/utils/dataConvert/DataConvert";
import FormData from "form-data";
import { getToken } from "next-auth/jwt";

// export const config = {
//   // run on edge
//   runtime: "edge",
// };

const get = async (userid, group, resources, token, definitions, res, req) => {
  let result;
  let data, errors;

  let url = `${DJANGO_BASE_URL}/get-details`;

  result = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const temp = await result.json();
  data = temp;
  errors = null;
  if (result.status !== 200) {
    errors = data;
    data = null;
  }
  return res.status(result.status).json({ data, errors });
  // return { data, errors };
};

const put = async (req, definitions, resources, token, res) => {
  console.log("in put ", typeof req.body);
  console.log("in put ", req.body);

  const formData = new FormData();
  formData.append("get_email_notification", req.body.get_email_notification);
  formData.append(
    "get_email_broadcast_notification",
    req.body.get_email_broadcast_notification
  );

  const result = await fetch(`${DJANGO_BASE_URL}/get-details`, {
    method: "PUT",
    headers: {
      // Application/json is not working
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(req.body),
  });

  let { data, errors } = await result.json();
  console.log("in put ", data);
  // console.log(data);
  return res.status(result.status).json({ data, errors });
  // return { data, errors: null };
};

export default async function userResources(req, res) {
  // const { searchParams } = new URL(req.url);
  // const resources = searchParams.get("resources");
  const { resources } = req.query;
  const { user } = await getToken({ req });
  console.log(user);
  const userid = user.user.id;
  if (!user) {
    // res.status(401).json({ message: "Unauthorized" });
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const token = user.access;
  const group = user.user.groups[0];
  const definitions = definitionsForResources[resources];

  if (req.method === "GET") {
    // const result = await get(group, resources, token, definitions, res);
    // return new Response(JSON.stringify(result), {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // console.log("in get ", resources);
    return await get(userid, group, resources, token, definitions, res, req);
  } else if (req.method === "PUT") {
    // const result = await post(req, definitions, resources, token, res);
    // return new Response(JSON.stringify(result), {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    return await put(req, definitions, resources, token, res, req);
  } else return res.status(405).json({ error: "Method not Allowed" });
  // else
  //   return new Response(JSON.stringify({ error: "Method not Allowed" }), {
  //     status: 405,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
}
