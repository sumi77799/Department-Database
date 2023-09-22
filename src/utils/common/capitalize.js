import splitIfUnderscore from "./split";

// funtion to capitalize the first letter of a string
export default function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// convert contactUs to Contact Us
export function convertToTitleCase(string) {
  let modifiedString = string
    .split(/(?=[A-Z])/)
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
  // also of it contains _ then replace it with space and capitalize the first letter of each word. i.e.  contact_us to Contact Us
  if (modifiedString.includes("_")) {
    modifiedString = splitIfUnderscore(modifiedString);
  }

  return modifiedString;
}
