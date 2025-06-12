import { useState, useEffect } from "react";

export function useAnimes() {
  const [animes, setAnimes] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAnime() {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/top/anime`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("unable to fetch");
        const dataObj = await res.json();

        setAnimes(dataObj);
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

    fetchAnime();
    return () => controller.abort();
  }, []);

  return { animes, isError, isLoading };
}
