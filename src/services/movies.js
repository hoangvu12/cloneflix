import { MOVIE_GENRES } from "../constants";
import { randomElement } from "../utils";
import { queryEndpoint, queryPageEndpoint } from "./helper";

export const discoverMovies = queryPageEndpoint("/discover/movie");

export const getLatestMovies = queryPageEndpoint("/discover/movie", {
  params: {
    sort_by: "release_date.desc",
    include_adult: true,
    "vote_count.gte": 5,
  },
});

export const getTrendingMovies = queryPageEndpoint("/trending/movie/week", {
  params: {
    sort_by: "popularity.desc",
  },
});

export const getPopularMovies = queryPageEndpoint("/movie/popular");
export const getTopRatedMovies = queryPageEndpoint("/movie/top_rated");
export const getUpcomingMovies = queryPageEndpoint("/movie/upcoming");
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

export const BROWSE_ITEMS = [
  {
    queryFn: getPopularMovies,
    title: "Popular on Netflix",
    name: "movies_popular",
  },
  {
    queryFn: getTopRatedMovies,
    title: "Top rated",
    name: "movies_top_rated",
  },
  {
    queryFn: getTrendingMovies,
    title: "Trending Now",
    name: "movies_trending",
  },
  ...randomElement(MOVIE_GENRES, 5).map((genre) => ({
    queryFn: () => getGenresMovies({ genreId: genre.id }),
    title: genre.name,
    name: `movies_${genre.name}`,
  })),
];

export const POPULAR_BROWSE_ITEMS = [
  {
    queryFn: getTopRatedMovies,
    title: "Top rated",
    name: "movies_top_rated",
  },
  {
    queryFn: () =>
      discoverMovies({
        options: {
          params: {
            sort_by: "popularity.desc",
            include_adult: true,
            "vote_count.gte": 5,
          },
        },
      }),
    title: "Most popular",
    name: "movies_most_popular",
  },
  {
    queryFn: getUpcomingMovies,
    title: "Upcoming",
    name: "movies_upcoming",
  },
];
