import { useEffect, useState } from "react";
import { useSearch } from "../contexts/useSearchContext";

async function fetchDetails(item, options) {
  try {
    const url =
      item.media_type === "movie"
        ? `https://api.themoviedb.org/3/movie/${item.id}?language=en-US`
        : `https://api.themoviedb.org/3/tv/${item.id}?language=en-US`;

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

  const {
    searchInput,
    hasSearched,
    setHasSearched,
    setFetchHasStarted,
  } = useSearch();

  useEffect(() => {
    const controller = new AbortController();
    const token = import.meta.env.VITE_TMDB_API_TOKEN;

    async function fetchSearchMedia() {
      setIsError(false);
      setIsLoading(true);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      };

      try {
        if (searchInput.trim().length >= 3) {
          setFetchHasStarted(true);
          const res = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${searchInput}`,
            options,
          );

          if (!res.ok) throw new Error("unable to fetch");

          const data = await res.json();
          const filteredData =
            data?.results?.filter(
              (item) => item.media_type !== "person",
            ) || [];

          const detailedFilteredData = await Promise.all(
            filteredData.map((item) =>
              fetchDetails(item, options),
            ),
          );

          setSearchMedia(detailedFilteredData);
          setHasSearched(true);
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          console.log(e.message);
          setIsError(true);
          setHasSearched(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    const delayDebounce = setTimeout(() => {
      fetchSearchMedia();
    }, 500);

    return () => {
      controller.abort();
      clearTimeout(delayDebounce);
    };
  }, [searchInput]);

  return { searchMedia, isError, isLoading, hasSearched };
}
