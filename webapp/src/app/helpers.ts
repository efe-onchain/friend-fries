export function convertEthToHumanReadable(ethValue: number): string {
  const decimalPlaces = 2; // adjust this to change the number of decimal places
  const decimalMultiplier = Math.pow(10, 18);
  const threshold = 0.01; // adjust this to change the threshold for displaying small numbers

  const humanReadableValue = ethValue / decimalMultiplier;

  if (Math.abs(humanReadableValue) < threshold) {
    // Display very small numbers in scientific notation
    return humanReadableValue.toExponential(decimalPlaces);
  } else {
    // Display normal numbers with decimal places
    return humanReadableValue.toFixed(decimalPlaces);
  }
}
export function convertUnixTimestampToDateTime(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000); // convert seconds to milliseconds
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${month} ${day}, ${year} ${hour}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}
