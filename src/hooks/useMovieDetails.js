import { getMovieDetails, getSimilarMovies } from "../services/movies";
import useQueries from "./useQueries";

const useMovieDetails = (movieId) => {
  const [data, isLoading, isError] = useQueries([
    {
      name: ["movie_details", { id: movieId }],
      fetch: () => getMovieDetails({ movieId }),
      key: "details",
    },
    {
      name: ["movie_similar-movies", { id: movieId }],
      fetch: () => getSimilarMovies({ movieId }),
      key: "similars",
    },
  ]);

  return [data, isLoading, isError];
};

export default useMovieDetails;
