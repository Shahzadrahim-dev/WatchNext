import { useState, useEffect } from "react";

export function useMovies() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(function () {
    const controller = new AbortController();

    async function fetchMovies() {
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

      // const res2 = await fetch(
      //   `https://api.themoviedb.org/3/search/multi?query=gladiator`,
      //   options,
      // );
      // console.log(await res2.json());
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options,
        );

        if (!res.ok)
          throw new Error("There was an error fetching");

        const data = await res.json();

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

        setMovieList(detailedMovies.filter(Boolean));
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

    fetchMovies();
    return () => {
      controller.abort();
    };
  }, []);

  return { movieList, isLoading, isError };
}
