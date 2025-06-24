import { useState, useEffect, useCallback } from "react";

export function useAnimes() {
  const [animes, setAnimes] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(false);
  const [isAutoLoad, setIsAutoLoad] = useState(false);

  const fetchAnime = useCallback(
    async function (signal) {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/top/anime?page=${page}`,
          { signal: signal },
        );

        if (!res.ok) throw new Error("unable to fetch");
        const dataObj = await res.json();

        setTotalPages(dataObj.pagination.last_visible_page);

        setAnimes((prev) => [...prev, ...dataObj.data]);
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

  useEffect(() => {
    const controller = new AbortController();

    fetchAnime(controller.signal);
    return () => controller.abort();
  }, [fetchAnime]);

  const loadNextAnimePage = () => setPage((p) => p + 1);

  return {
    animes,
    isError,
    isLoading,
    loadNextAnimePage,
    isAutoLoad,
    setIsAutoLoad,
    page,
    totalPages,
  };
}
