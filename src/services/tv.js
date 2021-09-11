import { queryEndpoint, queryPageEndpoint } from "./helper";

export const discoverTVShows = queryPageEndpoint("/discover/tv");

export const getLatestTVShows = queryEndpoint("/discover/tv", {
  params: {
    sort_by: "release_date.desc",
    include_adult: true,
    "vote_count.gte": 1,
  },
});

export const getTrendingTVShows = queryPageEndpoint("/trending/tv/week", {
  params: {
    sort_by: "popularity.desc",
  },
});

export const getPopularTVShows = queryPageEndpoint("/tv/popular");
export const getTopRatedTVShows = queryPageEndpoint("/tv/top_rated");
export const getTVShowDetails = queryEndpoint(({ tvId }) => `/tv/${tvId}`);
export const getTVShowImage = queryEndpoint(({ tvId }) => `/tv/${tvId}/images`);
export const getSimilarTVShows = queryEndpoint(
  ({ tvId }) => `/tv/${tvId}/similar`
);
export const getGenresTVShows = queryPageEndpoint(
  ({ genreId }) => `/discover/tv?with_genres=${genreId}`
);
