import { useQuery as useVueQuery } from "vue-query";

const useQuery = (name, fetch, options) => {
  const { data, isLoading, isError } = useVueQuery(name, fetch, options);

  return [data, isLoading, isError];
};

export default useQuery;
