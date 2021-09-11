import { TV_GENRES } from "../constants";
import {
  getGenresTVShows,
  getPopularTVShows,
  getTopRatedTVShows,
  getTrendingTVShows,
} from "../services/tv";
import { randomElement, slugify } from "../utils";
import useFilms from "./useFilms";

const randomGenres = randomElement(TV_GENRES, 5);
const useTV = () => {
  const [data, isLoading, isError] = useFilms(
    [
      {
        name: "tv_popular",
        fetch: () => getPopularTVShows({ page: 1 }),
        key: "popular",
        title: "Popular on Netflix",
      },
      {
        name: "tv_top_rated",
        fetch: () => getTopRatedTVShows({ page: 1 }),
        key: "top_rated",
        title: "Top rated",
      },
      {
        name: "tv_trending",
        fetch: () => getTrendingTVShows({ page: 1 }),
        key: "trending",
        title: "Trending Now",
      },
      ...randomGenres.map((genre) => ({
        key: slugify(genre.name),
        name: ["tv_genres", { id: genre.id }],
        fetch: () => getGenresTVShows({ genreId: genre.id }),
        title: genre.name,
      })),
    ],
    "tv"
  );

  return [data, isLoading, isError];
};

export default useTV;
