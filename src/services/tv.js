import { TV_GENRES } from "../constants";
import { randomElement } from "../utils";
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

export const BROWSE_ITEMS = [
  {
    queryFn: getPopularTVShows,
    title: "Popular on Netflix",
    name: "tv_popular",
  },
  {
    queryFn: getTopRatedTVShows,
    title: "Top rated",
    name: "tv_top_rated",
  },
  {
    queryFn: getTrendingTVShows,
    title: "Trending Now",
    name: "tv_trending",
  },
  ...randomElement(TV_GENRES, 5).map((genre) => ({
    queryFn: () => getGenresTVShows({ genreId: genre.id }),
    title: genre.name,
    name: `tv_${genre.name}`,
  })),
];
