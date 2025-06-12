import { useState, useEffect } from "react";

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

export function useTrending() {
  const [trendings, setTrendings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(function () {
    const controller = new AbortController();

    async function fetchTrendings() {
      const token = import.meta.env.VITE_TMDB_API_TOKEN;

      setIsLoading(true);
      setIsError(false);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      };

      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          options,
        );

        if (!res.ok)
          throw new Error("There was an error fetching");

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

        setTrendings(detailedFilteredData.filter(Boolean));
      } catch (e) {
        if (e.name !== "AbortError") {
          console.log(e.message);
          setIsError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchTrendings();

    return () => {
      controller.abort();
    };
  }, []);

  return { trendings, isLoading, isError };
}
