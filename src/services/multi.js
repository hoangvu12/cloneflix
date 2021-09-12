import { queryPageEndpoint } from "./helper";

export const search = queryPageEndpoint(
  ({ query }) => `/search/multi?query=${encodeURIComponent(query)}`,
  {
    params: {
      include_adult: true,
      "vote_count.gte": 5,
    },
  }
);
