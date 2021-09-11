import { MOVIE_GENRES } from "../constants";
import {
  getGenresMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../services/movies";
import { randomElement, slugify } from "../utils";
import useFilms from "./useFilms";

const randomGenres = randomElement(MOVIE_GENRES, 5);
const useMovies = () => {
  const [data, isLoading, isError] = useFilms(
    [
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
      ...randomGenres.map((genre) => ({
        key: slugify(genre.name),
        name: ["movie_genres", { id: genre.id }],
        fetch: () => getGenresMovies({ genreId: genre.id }),
        title: genre.name,
      })),
    ],
    "movies"
  );

  return [data, isLoading, isError];
};

export default useMovies;
