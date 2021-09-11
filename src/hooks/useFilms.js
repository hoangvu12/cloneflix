import { computed } from "vue";
import { randomIndex } from "../utils";
import useQueries from "./useQueries";

const useFilms = (queries) => {
  const [queryData, isLoading, isError] = useQueries(queries);

  const data = computed(() => {
    if (isLoading.value) return null;

    const latest = queryData.value.latest;
    const index = randomIndex(latest.results.length);
    const banner = latest.results[index];

    const items = queries
      .filter((query) => query.key !== "latest")
      .map((query) => {
        return {
          ...queryData.value[query.key],
          title: query.title,
        };
      });

    return {
      banner,
      items,
    };
  });

  return [data, isLoading, isError];
};

export default useFilms;
