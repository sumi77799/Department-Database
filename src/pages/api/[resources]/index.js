import definitionsForResources from "@/config/definitions";
import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { STAFF } from "@/constants/roles";
import {
  convertdefinitionsBack,
  modifyWithdefinitionsArray,
} from "@/utils/dataConvert/DataConvert";
import { getToken } from "next-auth/jwt";

// export const config = {
//   // run on edge
//   runtime: "edge",
// };

const get = async (
  userid,
  group,
  resources,
  token,
  definitions,
  res,
  req,
  department
) => {
  let result;
  let data, errors;
  const {
    from_date_published,
    to_date_published,
    from_date_accepted,
    to_date_accepted,
    from_date,
    to_date,
  } = req.query;
  // console.log("group: ");
  let query_string = "";
  if (from_date_published !== "null") {
    query_string += `from_date_published=${from_date_published}&to_date_published=${to_date_published}&`;
  } else if (from_date_accepted !== "null") {
    query_string += `from_date_accepted=${from_date_accepted}&to_date_accepted=${to_date_accepted}&`;
  } else if (from_date !== "null") {
    query_string += `from_date=${from_date}&to_date=${to_date}&`;
  }

  let url = `${DJANGO_BASE_URL}/${resources}?${query_string}`;

  if (group !== "Staff") {
    url = `${DJANGO_BASE_URL}/${resources}/?user=${userid}&${query_string}`;
  } else {
    url = `${DJANGO_BASE_URL}/${resources}/?department=${department}&${query_string}`;
  }
  console.log("url: ", url);

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

const post = async (req, definitions, resources, token, res) => {
  const jsonBody = convertdefinitionsBack(req.body, definitions, resources);
  // console.log("request body :", req.body);
  // console.log("Jsonbody post to create application : ", jsonBody);

  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });

  let { data, errors } = await result.json();
  // console.log(data);
  return res.status(result.status).json({ data, errors });
  // return { data, errors: null };
};

export default async function userResources(req, res) {
  // const { searchParams } = new URL(req.url);
  // const resources = searchParams.get("resources");
  const { resources } = req.query;
  const { user } = await getToken({ req });
  // console.log(user);
  const userid = user.user.id;
  const department = user.user.department;
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
    return await get(
      userid,
      group,
      resources,
      token,
      definitions,
      res,
      req,
      department
    );
  } else if (req.method === "POST") {
    // const result = await post(req, definitions, resources, token, res);
    // return new Response(JSON.stringify(result), {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    return await post(req, definitions, resources, token, res, req);
  } else return res.status(405).json({ error: "Method not Allowed" });
  // else
  //   return new Response(JSON.stringify({ error: "Method not Allowed" }), {
  //     status: 405,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
}
