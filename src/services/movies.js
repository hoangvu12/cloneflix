import { queryEndpoint, queryPageEndpoint } from "./helper";

export const discoverMovies = queryPageEndpoint("/discover/movie");

export const getLatestMovies = queryPageEndpoint("/discover/movie", {
  params: {
    sort_by: "release_date.desc",
    include_adult: true,
    "vote_count.gte": 1,
  },
});

export const getTrendingMovies = queryPageEndpoint("/trending/movie/week", {
  params: {
    sort_by: "popularity.desc",
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
export const getGenresMovies = queryPageEndpoint(
  ({ genreId }) => `/discover/movie?with_genres=${genreId}`
);
