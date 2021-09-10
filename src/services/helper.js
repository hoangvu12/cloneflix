import instance from "./instance";

export const queryEndpoint =
  (endpoint) =>
  async ({ options, ...args }) => {
    // Deal with dynamic endpoints. Ex: /movie/{movie_id}/images
    const finalEndpoint =
      typeof endpoint === "function"
        ? endpoint({ options, ...args })
        : endpoint;

    const { data } = await instance.get(finalEndpoint, options);

    return data;
  };

export const queryPageEndpoint =
  (endpoint) =>
  async ({ page = 1, options }) => {
    const { data } = await instance.get(endpoint, {
      params: { page },
      ...options,
    });

    return data;
  };
