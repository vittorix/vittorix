// usage:
// import * as UTIL from "./util.js";

export function isNumeric(value) {
  return /^\d+$/.test(value);
}

export async function writeToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

// usage:
// UTIL.readFromClipboard().then((read) => {
//   console.log("read:", read);
// });
export async function readFromClipboard() {
  const read = await navigator.clipboard.readText();
  return read;
}
