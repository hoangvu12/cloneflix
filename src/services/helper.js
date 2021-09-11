import instance from "./instance";

export const queryEndpoint =
  (endpoint, defaultOptions) =>
  async (value = {}) => {
    const { options = {}, ...args } = value;
    // Deal with dynamic endpoints. Ex: /movie/{movie_id}/images
    const finalEndpoint =
      typeof endpoint === "function"
        ? endpoint({ options, ...args })
        : endpoint;

    const { data } = await instance.get(finalEndpoint, {
      ...defaultOptions,
      ...options,
    });

    return data;
  };

export const queryPageEndpoint =
  (endpoint, defaultOptions) =>
  async (value = {}) => {
    const { page = 1, options, ...args } = value;
    const finalEndpoint =
      typeof endpoint === "function"
        ? endpoint({ options, ...args })
        : endpoint;

    const { data } = await instance.get(finalEndpoint, {
      params: { page },
      ...defaultOptions,
      ...options,
    });

    return data;
  };
