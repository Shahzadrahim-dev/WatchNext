import { useState, useEffect, useCallback } from "react";

export function useTVShows() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tvShows, setTVShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [isAutoLoad, setIsAutoLoad] = useState(false);

  const fetchTVShows = useCallback(
    async function (signal) {
      const token = import.meta.env.VITE_TMDB_API_TOKEN;

      setIsLoading(true);
      setIsError(false);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        signal: signal,
      };

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
          options,
        );

        if (!res.ok)
          throw new Error("There was an error fetching");

        const data = await res.json();
        setTotalPages(data.total_pages);

        const detailedData = await Promise.all(
          data.results.map(async (item) => {
            try {
              const res = await fetch(
                `https://api.themoviedb.org/3/tv/${item.id}?language=en-US`,
                options,
              );
              if (!res.ok)
                throw new Error(
                  "There was an error fetching",
                );
              return await res.json();
            } catch (e) {
              console.log(e.message);
              return null;
            }
          }),
        );

        setTVShows((prev) => [
          ...prev,
          ...detailedData.filter(Boolean),
        ]);
      } catch (e) {
        if (e.name !== "AbortError") {
          setIsError(true);
          console.log(e.message);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [page],
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchTVShows(controller.signal);

    return () => controller.abort();
  }, [fetchTVShows]);

  function loadNextTVShowPage() {
    setPage((p) => p + 1);
  }

  return {
    tvShows,
    isLoading,
    isError,
    loadNextTVShowPage,
    isAutoLoad,
    setIsAutoLoad,
    totalPages,
    page,
  };
}
