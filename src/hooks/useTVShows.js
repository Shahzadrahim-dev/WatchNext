import { useState, useEffect, useCallback } from "react";
import { useGenres } from "../contexts/useGenresContext";

export function useTVShows() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tvShows, setTVShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isAutoLoad, setIsAutoLoad] = useState(false);
  const { isTopRatedOn, genre } = useGenres();
  let topRatedFilter = null;
  let topRatedPlusGenre = null;

  if (isTopRatedOn) {
    topRatedFilter = "top_rated";
    topRatedPlusGenre =
      "&sort_by=vote_average.desc&vote_count.gte=100";
  } else {
    topRatedFilter = "popular";
    topRatedPlusGenre = "";
  }

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
        let res = null;
        if (genre) {
          res = await fetch(
            `https://api.themoviedb.org/3/discover/tv?with_genres=${genre.id}&page=${page}&language=en-US${topRatedPlusGenre}`,
            options,
          );
        } else {
          res = await fetch(
            `https://api.themoviedb.org/3/tv/${topRatedFilter}?language=en-US&page=${page}`,
            options,
          );
        }

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
    [genre, page, topRatedFilter, topRatedPlusGenre],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchTVShows(controller.signal);
    return () => controller.abort();
  }, [fetchTVShows]);

  useEffect(() => {
    setTVShows([]);
    setPage(1);
  }, [isTopRatedOn, genre]);

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
