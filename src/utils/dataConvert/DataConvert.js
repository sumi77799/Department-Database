import formDataList from "@/config/formData";

const convertdefinitionsBack = (jsonBody, definitions, resources) => {
  for (const key in jsonBody) {
    const element = jsonBody[key];
    if (key in definitions) {
      jsonBody[key] = Object.keys(definitions[key]).find(
        (item) => definitions[key][item] === element
      );
    }
  }

  return jsonBody;
};

const modifyWithdefinitions = (data, definitions) => {
  // console.log("Data in modifyWithdefinitions: ", data);
  for (const key in data) {
    const element = data[key];
    if (key in definitions) {
      data[key] = definitions[key][element];
    }
  }

  // console.log("Data after modifyWithdefinitions: ", data);

  return data;
};
const modifyWithdefinitionsArray = (data, definitions) => {
  // console.log("Data in modifyWithdefinitions: ", data);
  for (let item in data) {
    for (const key in data[item]) {
      const element = data[item][key];
      if (key in definitions) {
        data[item][key] = definitions[key][element];
      }
    }
  }
  // console.log("Data after modifyWithdefinitions: ", data);

  return data;
};

const extractFormData = (resourceType, formRef) => {
  const formData = {};
  const attributes = formDataList[resourceType];

  attributes.forEach((attribute) => {
    console.log("Adding attribute: ", attribute);
    //check if attribute is empty
    if (formRef.current[attribute].value !== "") {
      formData[attribute] = formRef.current[attribute].value;
    }
  });

  return formData;
};

const addAttribute = (formData, attribute, value) => {
  formData[attribute] = value;
};

const getFormData = (
  formRef,
  resources,
  authList,
  departmentList,
  fieldTagsList
) => {
  //use switch case for different resources
  let formData = extractFormData(resources, formRef);
  switch (resources) {
    case "publications":
      addAttribute(formData, "authors", authList);
      addAttribute(formData, "field_tags", fieldTagsList);
      addAttribute(formData, "department", departmentList);

      break;
    case "projects":
      addAttribute(formData, "members", authList);
      addAttribute(formData, "department", departmentList);

      break;
    case "achievements":
      addAttribute(formData, "participants", authList);
      addAttribute(formData, "department", departmentList);

      break;
    case "events":
      // handle events here
      addAttribute(formData, "organizers", authList);
      addAttribute(formData, "department", departmentList);

      break;
    case "visits":
      addAttribute(formData, "user", authList[0]);
      addAttribute(formData, "department", departmentList);
    case "department":
      addAttribute(formData, "Hod", authList[0]);
      break;
    case "research_labs":
      addAttribute(formData, "Head", authList[0]);
      break;
    case "batch":
      addAttribute(formData, "department", departmentList[0]);
    default:
      // handle any other cases here
      break;
  }

  return formData;
};

export {
  convertdefinitionsBack,
  modifyWithdefinitions,
  modifyWithdefinitionsArray,
  getFormData,
};
