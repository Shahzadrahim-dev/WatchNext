import { useState, useEffect, useCallback } from "react";
import { useGenres } from "../contexts/useGenresContext";

export function useAnimes() {
  const [animes, setAnimes] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isAutoLoad, setIsAutoLoad] = useState(false);
  const { isTopRatedOn, jaikanGenre } = useGenres();
  let topRatedFilter = null;
  let topRatedPlusGenre = null;

  if (isTopRatedOn) {
    topRatedFilter = ""; // by default this api returns top rated
    topRatedPlusGenre = "order_by=score&sort=desc";
  } else {
    topRatedPlusGenre = "";
    topRatedFilter = "filter=bypopularity&"; // by applying this we get popular anime's list, which is what we want as default
  }

  const fetchAnime = useCallback(
    async function (signal) {
      setIsLoading(true);
      setIsError(false);

      try {
        let res = null;

        if (jaikanGenre) {
          res = await fetch(
            ` https://api.jikan.moe/v4/anime?genres=${jaikanGenre.mal_id}&${topRatedPlusGenre}&page=${page}`,
            { signal: signal },
          );
        } else {
          res = await fetch(
            `https://api.jikan.moe/v4/top/anime?${topRatedFilter}page=${page}`,
            { signal: signal },
          );
        }

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

    [jaikanGenre, page, topRatedFilter, topRatedPlusGenre],
  );

  useEffect(() => {
    setAnimes([]);
    setPage(1);
  }, [isTopRatedOn, jaikanGenre]);

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
