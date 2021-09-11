import { MOVIE_GENRES } from "../constants";
import {
  getGenresMovies,
  getLatestMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../services/movies";
import { randomElement, slugify } from "../utils";
import useFilms from "./useFilms";

const useMovies = () => {
  const randomGenres = randomElement(MOVIE_GENRES, 5);

  const [data, isLoading, isError] = useFilms([
    {
      name: "movie_popular",
      fetch: () => getPopularMovies({ page: 1 }),
      key: "popular",
      title: "Popular on Netflix",
    },
    {
      name: "movie_top_rated",
      fetch: () => getTopRatedMovies({ page: 1 }),
      key: "top_rated",
      title: "Top rated",
    },
    {
      name: "movie_trending",
      fetch: () => getTrendingMovies({ page: 1 }),
      key: "trending",
      title: "Trending Now",
    },
    {
      key: "latest",
      name: "movie_latest",
      fetch: getLatestMovies,
    },
    ...randomGenres.map((genre) => ({
      key: slugify(genre.name),
      name: ["movie_genres", { id: genre.id }],
      fetch: () => getGenresMovies({ genreId: genre.id }),
      title: genre.name,
    })),
  ]);

  return [data, isLoading, isError];
};

export default useMovies;
