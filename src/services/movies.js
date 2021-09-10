import { queryEndpoint, queryPageEndpoint } from "./helper";

export const getLatestMovies = queryEndpoint("/discover/movie", {
  params: {
    sort_by: "release_date.desc",
    include_adult: true,
    "vote_count.gte": 1,
  },
});
export const getPopularMovies = queryPageEndpoint("/movie/popular");
export const getTopRatedMovies = queryPageEndpoint("/movie/top_rated");
export const getMovieDetails = queryEndpoint(
  ({ movieId }) => `/movie/${movieId}`
);
export const getMovieImages = queryEndpoint(
  ({ movieId }) => `/movie/${movieId}/images`
);
export const getSimilarMovies = queryEndpoint(
  ({ movieId }) => `/movie/${movieId}/similar`
);
