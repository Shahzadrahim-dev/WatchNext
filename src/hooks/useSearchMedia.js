import { useEffect, useState, useCallback } from "react";
import { useSearch } from "../contexts/useSearchContext";
import { useGenres } from "../contexts/useGenresContext";

async function fetchDetails(item, options, mediaType) {
  try {
    const url = `https://api.themoviedb.org/3/${mediaType}/${item.id}?language=en-US`;

    const res = await fetch(url, options);
    if (!res.ok) throw new Error("unable to fetch details");
    return await res.json();
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

export function useSearchMedia() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchMedia, setSearchMedia] = useState([]);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isAutoLoad, setIsAutoLoad] = useState(false);

  const { isTopRatedOn } = useGenres();

  const {
    searchInput,
    setHasSearched,
    setHasFetchStarted,
  } = useSearch();

  const fetchSearchMedia = useCallback(
    async function (
      signal,
      pageNumber = 1,
      append = false,
    ) {
      const token = import.meta.env.VITE_TMDB_API_TOKEN;

      setIsError(false);
      setIsLoading(true);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: signal,
      };

      try {
        if (searchInput.trim().length >= 3) {
          setHasFetchStarted(true);

          if (!append) {
            setPage(pageNumber);
            setIsAutoLoad(false);
          }

          const [movieRes, tvRes] = await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/search/movie?query=${searchInput}&page=${pageNumber}`,
              options,
            ),
            fetch(
              `https://api.themoviedb.org/3/search/tv?query=${searchInput}&page=${pageNumber}`,
              options,
            ),
          ]);

          if (!movieRes.ok || !tvRes.ok)
            throw new Error("unable to fetch");

          const [movieData, tvData] = await Promise.all([
            movieRes.json(),
            tvRes.json(),
          ]);

          const combinedResults = [
            ...(movieData.results?.map((item) => ({
              ...item,
              media_type: "movie",
            })) || []),
            ...(tvData.results?.map((item) => ({
              ...item,
              media_type: "tv",
            })) || []),
          ];

          let sorted = [];
          if (isTopRatedOn) {
            // sort by top rated
            sorted = [...combinedResults].sort((a, b) => {
              const ratingA =
                a.vote_average || a.score || 0;
              const ratingB =
                b.vote_average || b.score || 0;
              return ratingB - ratingA; // highest rating first
            });
          } else {
            sorted = combinedResults;
          }

          setTotalPages(
            Math.max(
              movieData.total_pages,
              tvData.total_pages,
            ),
          );

          const detailedResults = await Promise.all(
            sorted.map((item) =>
              fetchDetails(item, options, item.media_type),
            ),
          );

          const finalResults =
            detailedResults.filter(Boolean);

          if (append) {
            setSearchMedia((prev) => [
              ...prev,
              ...finalResults,
            ]);
          } else {
            setSearchMedia(finalResults);
          }

          setHasSearched(true);
        } else {
          setPage(1);
          setIsAutoLoad(false);
        }
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
    [
      searchInput,
      setHasFetchStarted,
      isTopRatedOn,
      setHasSearched,
    ],
  );

  useEffect(() => {
    const controller = new AbortController();

    setSearchMedia([]);

    const debounce = setTimeout(() => {
      fetchSearchMedia(controller.signal, 1, false);
    }, 500);

    return () => {
      controller.abort();
      clearTimeout(debounce);
      setHasSearched(false);
    };
  }, [
    fetchSearchMedia,
    searchInput,
    setHasSearched,
    setSearchMedia,
  ]);

  useEffect(() => {
    if (page === 1) return;
    const controller = new AbortController();
    fetchSearchMedia(controller.signal, page, true);
    return () => controller.abort();
  }, [page, fetchSearchMedia]);

  function getSearchMediaNextPage() {
    setPage((p) => p + 1);
  }

  return {
    searchMedia,
    isError,
    isLoading,
    isAutoLoad,
    setIsAutoLoad,
    getSearchMediaNextPage,
    totalPages,
    page,
  };
}
