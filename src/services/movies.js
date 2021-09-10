import { queryEndpoint, queryPageEndpoint } from "./helper";

export const getLatestMovie = queryEndpoint("/movie/latest");
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
