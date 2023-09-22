// split is a function that takes a string and splits it on the underscore character. It then joins the resulting array with a space character. This is useful for converting a string like "first_name" to "first name".
// also convert to camelCase
export default function splitIfUnderscore(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
