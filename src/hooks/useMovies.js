import { ref } from "vue";
import useQuery from "../hooks/useQuery";
import {
  getImages,
  getPopularMovies,
  getTopRatedMovies,
} from "../services/movies";
import { randomIndex } from "../utils";
import useQueries from "./useQueries";

const useMovies = () => {
  const [data, isLoading, isError] = useQueries([
    {
      name: "movie_popular",
      fetch: () => getPopularMovies(1),
      key: "popular",
    },
    {
      name: "movie_top_rated",
      fetch: () => getTopRatedMovies(1),
      key: "top_rated",
    },
  ]);

  return [data, isLoading, isError];
};

export default useMovies;
