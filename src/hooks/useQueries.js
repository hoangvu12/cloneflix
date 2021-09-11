import { ref, computed } from "vue";
import { useQuery } from "vue-query";

let cache = {};

const useQueries = (queries, name = "") => {
  if (name in cache) return [cache[name].value, false, false];

  const queryResults = ref(
    queries.reduce((prev, curr) => {
      const depend = curr.depend?.(prev);

      // If the query is depending on another query, return the queryResults
      // To let the query decide which data it gonna depends on.
      const options = curr.depend
        ? { ...curr.options, enabled: !!depend }
        : curr.options;

      prev.push({
        key: curr.key,
        query: useQuery(curr.name, () => curr.fetch(depend), options),
      });

      return prev;
    }, [])
  );

  let isLoading = computed(() =>
    queryResults.value.some((result) => result.query.isLoading)
  );

  let data = computed(() => {
    if (isLoading.value) return null;
    return queryResults.value.reduce(
      (prev, curr) => Object.assign(prev, { [curr.key]: curr.query.data }),
      {}
    );
  });

  let isError = computed(() =>
    queryResults.value.some((result) => result.query.isError)
  );

  cache[name] = computed(() => data);

  return [data, isLoading, isError];
};

export default useQueries;
