export const errorDecoder = (errors) => {
  if (typeof errors === "string" || errors instanceof String) {
    return errors;
  }
  let errorInResponse = "";
  if (errors) {
    for (const error in errors) {
      errorInResponse = error + ":";
      for (const err of errors[error]) {
        errorInResponse = errorInResponse + err + ",";
      }
      //slice the last comma
      errorInResponse = errorInResponse.slice(0, -1);
      break;
    }
  }
  return errorInResponse;
};
// if error is present then it will be of the form
// {"1": "error1", "2": null, "3": "error3"}
//function to combine it into a single string
export const errorDecoderForFileUpload = (errors) => {
  let errorInResponse = "";
  if (errors) {
    for (const error in errors) {
      errorInResponse =
        errorInResponse +
        "Row " +
        error +
        ": " +
        errorDecoder(errors[error]) +
        "\n";
    }
    //slice the last comma
    if (errorInResponse) {
      errorInResponse = errorInResponse.slice(0, -1);
    }
  }
  return errorInResponse;
};
