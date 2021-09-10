import { queryEndpoint, queryPageEndpoint } from "./helper";

export const getLatestMovie = queryEndpoint("/movie/latest");
export const getPopularMovies = queryPageEndpoint("/movie/popular");
export const getTopRatedMovies = queryPageEndpoint("/movie/top_rated");
export const getImages = queryEndpoint(
  ({ movieId }) => `/movie/${movieId}/images`
);
