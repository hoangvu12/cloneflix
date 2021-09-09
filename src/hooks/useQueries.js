import { ref, watch } from "vue";
import { useQuery } from "vue-query";

const useQueries = (queries) => {
  const queryResults = ref(
    queries.map(({ key, ...query }) => {
      return { key, query: useQuery(query.name, query.fetch, query.options) };
    })
  );

  let data = ref(null);
  let isLoading = ref(false);
  let isError = ref(false);

  watch(
    () => queryResults.value,
    (value) => {
      if (value.some((result) => result.query.isLoading?.value)) {
        isLoading.value = true;
      } else {
        data.value = value.reduce(
          (prev, curr) => Object.assign(prev, { [curr.key]: curr.query.data }),
          {}
        );
      }

      if (value.some(({ query: { isError } }) => isError.value)) {
        isError.value = true;
      }
    },
    { deep: true }
  );

  return [data, isLoading, isError];
};

export default useQueries;
