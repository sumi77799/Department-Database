import definitionsForResources from "@/config/definitions";
import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { getToken } from "next-auth/jwt";
import FormData from "form-data";
import { IncomingForm } from "formidable";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const post = async (req, resources, token, res) => {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const form = new FormData();
  form.append("file", req.body);

  const boundary = form.getBoundary();

  // console.log("form: ", form);

  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/create/upload/`, {
    method: "POST",
    headers: {
      // ContentType: "multipart/form-data",
      "Content-Type": "multipart/form-data; boundary=" + boundary,
      Authorization: `Bearer ${token}`,
      ...form.getHeaders(),
    },
    body: form,
    // formData: form,
    // file: req.body
  });

  // const { data, data_errors, errors } = await result.json();
  const data = await result.json();
  console.log("data: ", data);
  // return res.status(result.status).json({ data, data_errors, errors });
  return res.status(result.status).json({ data });
};

const post1 = async (req, resources, token, res) => {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("url is: ", `${DJANGO_BASE_URL}/${resources}/create/upload/`);
  console.log("req: ", req.body);
  const fData = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log("err: ", err);
        reject({ err });
      }
      resolve({ fields, files });
    });
  });
  console.log("url is: ", `${DJANGO_BASE_URL}/${resources}/create/upload/`);

  console.log("fData: ", fData);
  console.log("url is: ", `${DJANGO_BASE_URL}/${resources}/create/upload/`);

  const csvFile = fData.files.file;
  const tempCsvPath = csvFile?.filepath;

  const file = await fs.readFile(tempCsvPath);

  const data = new FormData();
  data.append("file", file, { filename: `${resources}.csv` });

  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/create/upload/`, {
    method: "POST",
    headers: {
      // ContentType: "multipart/form-data",
      "Content-Type": `multipart/form-data; boundary=${data.getBoundary()}`,
      Authorization: `Bearer ${token}`,
      // ...form.getHeaders()
    },
    body: data,
    // formData: form,
    // file: req.body
  });
  if (tempCsvPath) {
    await fs.rm(tempCsvPath);
  }
  // const { data, data_errors, errors } = await result.json();
  const _data = await result.json();
  console.log("_data: ", _data);
  // return res.status(result.status).json({ _data, _data_errors, errors });
  return res.status(result.status).json(_data);
};

const get = async (req, resources, token, res) => {
  console.log("in get upload student");

  const result = await fetch(`${DJANGO_BASE_URL}/${resources}/create/upload/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(result);
  // result is a file blob, return it
  console.log("Template received");
  result.body.pipe(res);
  return;
};

export default async function userResources(req, res) {
  // const { searchParams } = new URL(req.url);
  // const resources = searchParams.get("resources");
  const { resources } = req.query;
  const { user } = await getToken({ req });
  if (!user) {
    // TODO: remove this

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

  if (req.method === "POST") {
    return await post1(req, resources, token, res);
  }
  if (req.method === "GET") {
    console.log("in get upload student");
    return await get(req, resources, token, res);
  } else return res.status(405).json({ error: "Method not Allowed" });
}
