export function formatText(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/,([^\s])/g, ", $1")
    .replace(/\s+/g, " ")
    .trim();
}


