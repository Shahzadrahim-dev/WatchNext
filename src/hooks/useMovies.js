import { useState, useEffect, useCallback } from "react";
import { useGenres } from "../contexts/useGenresContext";

export function useMovies() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [isAutoLoad, setIsAutoLoad] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const { isTopRatedOn, genre } = useGenres();
  let topRatedFilter = null;
  let topRatedPlusGenre = null;

  if (isTopRatedOn) {
    topRatedFilter = "top_rated";
    topRatedPlusGenre =
      "&sort_by=vote_average.desc&vote_count.gte=1000";
  } else {
    topRatedFilter = "popular";
    topRatedPlusGenre = "";
  }

  const fetchMovies = useCallback(
    async (signal) => {
      const token = import.meta.env.VITE_TMDB_API_TOKEN;

      setIsLoading(true);
      setIsError(false);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        signal,
      };

      try {
        let res = null;
        if (genre) {
          res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&page=${page}&language=en-US${topRatedPlusGenre}`,
            options,
          );
        } else {
          res = await fetch(
            `https://api.themoviedb.org/3/movie/${topRatedFilter}?language=en-US&page=${page}`,
            options,
          );
        }

        if (!res.ok)
          throw new Error("There was an error fetching");

        const data = await res.json();

        setTotalPages(data.total_pages);
        const detailedMovies = await Promise.all(
          data.results.map(async (movie) => {
            try {
              const res = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
                options,
              );
              if (!res.ok)
                throw new Error("unable to fetch");
              return await res.json();
            } catch (e) {
              console.log(e.message);
              return null;
            }
          }),
        );

        setMovieList((prev) => [
          ...prev,
          ...detailedMovies.filter(Boolean),
        ]);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.log(e.message);
          setIsError(true);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [genre, page, topRatedPlusGenre, topRatedFilter],
  );

  useEffect(
    function () {
      const controller = new AbortController();
      fetchMovies(controller.signal);
      return () => {
        controller.abort();
      };
    },
    [fetchMovies],
  );

  useEffect(() => {
    setMovieList([]);
    setPage(1);
  }, [isTopRatedOn, genre]);

  const loadNextMoviePage = () => setPage((p) => p + 1);

  return {
    movieList,
    isLoading,
    isError,
    loadNextMoviePage,
    isAutoLoad,
    setIsAutoLoad,
    totalPages,
    page,
  };
}
