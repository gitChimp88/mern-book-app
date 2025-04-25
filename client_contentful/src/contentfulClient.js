import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_CF_SPACE_ID,
  accessToken: import.meta.env.VITE_CF_CMA_TOKEN,
});

export default client;
