const { default: splitIfUnderscore } = require("../common/split");

const formValidate = (formref, authList, departmentList, resources) => {
  //iterate through all form fields if it is empty then add it to errors with the name and return it.
  let errors = {};
  let form = formref.current;
  for (let i = 0; i < form.length; i++) {
    if (form[i].required && (form[i].value === "" || form[i].value === null)) {
      if (
        form[i].name === "authors" ||
        form[i].name === "department" ||
        form[i].name === "members" ||
        form[i].name === "participants" ||
        form[i].name === "organizers" ||
        form[i].name === "user"
      ) {
        if (form[i].name === "department") {
          if (departmentList.length === 0) {
            errors[form[i].name] = `Atleast one ${splitIfUnderscore(
              form[i].name
            )} is required`;
            continue;
          }
        } else {
          if (authList.length === 0) {
            errors[form[i].name] = `Atleast one ${splitIfUnderscore(
              form[i].name
            )} is required`;
          }
        }
        continue;
      }
      errors[form[i].name] = `${splitIfUnderscore(form[i].name)} is required`;
    } else if (
      form[i].required &&
      (resources === "visits" ||
        resources === "events" ||
        resources === "department") &&
      (form[i].name === "authors" ||
        form[i].name === "department" ||
        form[i].name === "members" ||
        form[i].name === "participants" ||
        form[i].name === "organizers" ||
        form[i].name === "user") &&
      authList.length != 1
    ) {
      errors[form[i].name] = `Exactly one ${splitIfUnderscore(
        form[i].name
      )} is required`;
    } else if (
      form[i].required &&
      resources === "batch" &&
      form[i].name === "department" &&
      departmentList.length != 1
    ) {
      errors[form[i].name] = `Exactly one ${splitIfUnderscore(
        form[i].name
      )} is required`;
    }
  }
  return errors;
};

export { formValidate };
