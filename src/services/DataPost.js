import {
  errorDecoder,
  errorDecoderForFileUpload,
} from "@/utils/errorDecoder/errorDecoder";
import FormData from "form-data";

const handleFacultyPost = async (formData, resources, type) => {
  const result = await fetch(`/api/${resources}/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const { data, errors } = await result.json();

  // console.log("Data in faculty post new: ", data)
  // console.log("Errors in faculty post new: ", errors)
  // let errors = "Something went wrong";
  return { data, errors };
};

const handleStudentPost = async (formData, resources) => {
  // Two requests are made to the server, first POST on  draft at /api/${resources}/draft, then get the draft id from the resulting json (id)
  //Then a put request on /api/submit/${id} is made to submit the draft
  console.log("In handleStudentPost");
  const result = await fetch(`/api/${resources}/draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const { data, errors } = await result.json();

  if (result.status === 200) {
    const Submitresult = await fetch(`/api/${resources}/submit/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const submitData = await Submitresult.json();
    const _data = submitData["data"];
    const _errors = submitData["errors"];

    return { data: _data, errors: errorDecoder(_errors) };
  } else {
    return { data, errors };
  }
};

//function to handle post drafts
const handlePostDraft = async (formData, resources, type) => {
  const result = await fetch(`/api/${resources}/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const { data, errors } = await result.json();

  return { data, errors };
};

export const postData = async (tab, recources, formData, group, id) => {
  let type = tab;
  if (id) {
    type = `${tab}/${id}`;
  }
  if (tab === "draft") {
    return await handlePostDraft(formData, recources, type);
  } else if (group === "Faculty" || group === "Staff") {
    return await handleFacultyPost(formData, recources, type);
  } else if (group === "Student") {
    return await handleStudentPost(formData, recources);
  } else {
    //return unauthorized
    return { data: null, errors: "Unauthorized" };
  }
};

export const postFileData = async (recources, file) => {
  let formData = new FormData();
  formData.append("file", file);
  console.log(formData._boundary);
  const result = await fetch(`/api/${recources}/upload`, {
    method: "POST",
    headers: {},
    headers: {
      // "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
    body: formData,
  });

  const { data, data_errors, errors } = await result.json();
  return { data, data_errors, errors };
};

export const handleReportPost = async (type, jsonData) => {
  const result = await fetch(`/api/reports/${type}/1/1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });
  console.log("Result: ", result);
  return await result.blob();
};
