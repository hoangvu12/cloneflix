import { useRouter } from "vue-router";

const useHeaderRoute = () => {
  const { currentRoute, getRoutes } = useRouter();
  const routes = getRoutes();

  // Somehow the home route placed behind dynamic routes
  // So I have to sort it back
  const headerRoutes = routes
    .sort((a, b) => a.path.length - b.path.length)
    .filter((route) => route.props?.default?.isHeader);

  return {
    routes: headerRoutes,
    currentRoute,
  };
};

export default useHeaderRoute;
