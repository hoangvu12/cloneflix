import useQuery from "../hooks/useQuery";
import { search } from "../services/multi";

const useSearch = (query) => {
  return useQuery(["search", { query }], () => search({ query }));
};

export default useSearch;
