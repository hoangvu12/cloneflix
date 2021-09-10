import {
  getMovieImages,
  getPopularMovies,
  getTopRatedMovies,
} from "../services/movies";
import { randomIndex } from "../utils";
import useQueries from "./useQueries";

const useMovies = () => {
  const [data, isLoading, isError] = useQueries([
    {
      name: "movie_popular",
      fetch: () => getPopularMovies({ page: 1 }),
      key: "popular",
    },
    {
      name: "movie_top_rated",
      fetch: () => getTopRatedMovies({ page: 1 }),
      key: "top_rated",
    },
    {
      key: "images",
      depend: (prev) => prev.find((result) => result.key === "popular"),
      name: "movie_images",
      fetch: ({ query }) => {
        const results = query.data.value.results;

        const index = randomIndex(results.length);

        return getMovieImages({ movieId: results[index].id });
      },
    },
  ]);

  return [data, isLoading, isError];
};

export default useMovies;
