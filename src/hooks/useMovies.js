import { useState, useEffect, useCallback } from "react";

export function useMovies() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [isAutoLoad, setIsAutoLoad] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

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
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          options,
        );

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
    [page],
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
