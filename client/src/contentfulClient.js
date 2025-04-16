import { createClient } from "contentful";

console.log("spaceID - ", import.meta.env.CF_SPACE_ID);
console.log("accessToken - ", import.meta.env.CF_CMA_TOKEN);
const client = createClient({
  space: import.meta.env.VITE_CF_SPACE_ID,
  accessToken: import.meta.env.VITE_CF_CMA_TOKEN,
});

export default client;
