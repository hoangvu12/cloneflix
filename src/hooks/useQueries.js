import { ref, computed } from "vue";
import { useQuery } from "vue-query";

const useQueries = (queries) => {
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

  return [data, isLoading, isError];
};

export default useQueries;
