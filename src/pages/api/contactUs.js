import { DJANGO_BASE_URL } from "@/constants/endPoints";
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default async function handler(req, res) {
  const { user } = await getToken({ req });
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = user.access;

  if (req.method === "POST") {
    const form = formidable({ multiples: true });

    // Parse the form data and extract the fields and files
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log("err: ", err);
          reject({ err });
        }
        resolve({ fields, files });
      });
    });

    // print the fields
    console.log("fields: ", fields);
    console.log("files: ", files);

    const formData = new FormData();

    // Add fields to the form data
    formData.append("issue_category", fields.issue_category);
    formData.append("issue", fields.issue);

    // Add files to the form data
    if (files.screenshot) {
      console.log("files.screenshot: ", files.screenshot);
      const screenshot = fs.createReadStream(files.screenshot.filepath);
      formData.append("screenshot", screenshot, files.screenshot.name);
    }

    // Send the form data to Django
    const result = await fetch(`${DJANGO_BASE_URL}/query/`, {
      method: "POST",
      headers: {
        // detail: 'Multipart form parse error - Invalid boundary in multipart: None'
        "Content-Type":
          "multipart/form-data; boundary=" + formData.getBoundary(),
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log("result: ", result.status);
    const data = await result.json();

    console.log("data: ", data);

    return res.status(result.status).json(data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
