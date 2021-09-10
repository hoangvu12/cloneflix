import {
  getLatestMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "../services/movies";
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
      key: "latest",
      name: "movie_latest",
      fetch: getLatestMovies,
    },
  ]);

  return [data, isLoading, isError];
};

export default useMovies;
