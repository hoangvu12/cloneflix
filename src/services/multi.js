import { queryPageEndpoint } from "./helper";

export const search = queryPageEndpoint(
  ({ query }) => `/search/multi?query=${encodeURIComponent(query)}`
);
