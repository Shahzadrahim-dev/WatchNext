import { useState, useEffect } from "react";

export function useTVShows() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTVShows() {
      const token = import.meta.env.VITE_TMDB_API_TOKEN;

      setIsLoading(true);
      setIsError(false);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      };

      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
          options,
        );

        if (!res.ok)
          throw new Error("There was an error fetching");

        const data = await res.json();

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

        setTVShows(detailedData.filter(Boolean));
      } catch (e) {
        if (e.name !== "AbortError") {
          setIsError(true);
          console.log(e.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchTVShows();

    return () => controller.abort();
  }, []);

  return { tvShows, isLoading, isError };
}
