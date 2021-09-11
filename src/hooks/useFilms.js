import { computed } from "vue";
import { randomIndex } from "../utils";
import useQueries from "./useQueries";

const cache = {};

const useFilms = (queries, name) => {
  const [queryData, isLoading, isError] = useQueries(queries, name);

  const data = computed(() => {
    if (isLoading.value) return null;
    if (cache[name]) return cache[name];

    const { results } = queryData.value.popular;
    const validResults = results.filter((item) => item.backdrop_path);
    const index = randomIndex(validResults.length);
    const banner = validResults[index];

    const items = queries.map((query) => {
      return {
        ...queryData.value[query.key],
        title: query.title,
      };
    });

    cache[name] = {
      banner,
      items,
    };

    return {
      banner,
      items,
    };
  });

  return [data, isLoading, isError];
};

export default useFilms;
