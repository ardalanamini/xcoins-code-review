import { readDBUri } from "./fs.js";

export * from "./http.js";

export * as factory from "./factories/index.js";

export const DATABASE_URI = readDBUri();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serialize(record: any): any {
  return JSON.parse(JSON.stringify(record));
}
