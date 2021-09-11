import { getSimilarTVShows, getTVShowDetails } from "../services/tv";
import useQueries from "./useQueries";

const useTVDetails = (tvId) => {
  const [data, isLoading, isError] = useQueries([
    {
      name: ["tv_details", { id: tvId }],
      fetch: () => getTVShowDetails({ tvId }),
      key: "details",
    },
    {
      name: ["tv_similar-shows", { id: tvId }],
      fetch: () => getSimilarTVShows({ tvId }),
      key: "similars",
    },
  ]);

  return [data, isLoading, isError];
};

export default useTVDetails;
