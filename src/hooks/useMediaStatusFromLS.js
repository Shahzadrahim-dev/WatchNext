import { useEffect, useState } from "react";
import { useGenres } from "../contexts/useGenresContext";

export function useMediaStatusFromLS(statusType) {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { isTopRatedOn } = useGenres();
  const [skeletonCount, setSkeletonCount] = useState(0);

  useEffect(() => {
    const statusMap = {
      favorites: "isFavorited",
      watched: "isWatched",
      watchlisted: "isWatchlisted",
    };

    const statusKey = statusMap[statusType];

    const controller = new AbortController();

    let latestData = {};
    try {
      const stored = localStorage.getItem("mediaStatus");
      latestData =
        stored !== null ? JSON.parse(stored) : {};
    } catch (err) {
      console.error(err);
    }

    const Ids = Object.entries(latestData).map((item) => {
      if (item[1][statusKey] === true) {
        if (item[1].isAnime === true) {
          return {
            id: Number(item[0]),
            isAnime: true,
            isTVShow: false,
          };
        } else if (item[1].isTVShow === true) {
          return {
            id: Number(item[0]),
            isAnime: false,
            isTVShow: true,
          };
        } else {
          return {
            id: Number(item[0]),
            isAnime: false,
            isTVShow: false,
          };
        }
      } else {
        return null;
      }
    });

    const filteredIds = Ids.filter((item) => item !== null);
    setSkeletonCount(filteredIds.length);

    async function getMedia() {
      const token = import.meta.env.VITE_TMDB_API_TOKEN;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      };

      setIsLoading(true);
      setIsError(false);

      const fetchedData = await Promise.all(
        filteredIds.map(async (fav) => {
          try {
            if (fav.isAnime === true) {
              const res = await fetch(
                `https://api.jikan.moe/v4/anime/${fav.id}`,
              );
              if (!res.ok)
                throw new Error("unable to fetch");
              return await res.json();
            } else if (fav.isTVShow === true) {
              const res = await fetch(
                `https://api.themoviedb.org/3/tv/${fav.id}`,
                options,
              );
              if (!res.ok) throw new Error("unable fetch");
              return await res.json();
            } else {
              const res = await fetch(
                `https://api.themoviedb.org/3/movie/${fav.id}`,
                options,
              );
              if (!res.ok) throw new Error("unable fetch");
              return await res.json();
            }
          } catch (err) {
            if (err.name !== "AbortError") {
              console.log(err.message);
              setIsError(true);
            }
          }
        }),
      );

      const flattenedData = fetchedData.map((item) => {
        if (item?.data) {
          return item.data;
        } else {
          return item;
        }
      });

      let sorted = [];
      if (isTopRatedOn) {
        // sort by top rated
        sorted = [...flattenedData].sort((a, b) => {
          const ratingA = a.vote_average || a.score || 0;
          const ratingB = b.vote_average || b.score || 0;
          return ratingB - ratingA; // highest rating first
        });
      } else {
        sorted = flattenedData;
      }

      setMedia(sorted.filter(Boolean));
      setIsLoading(false);
    }
    getMedia();
  }, [isTopRatedOn, setSkeletonCount, statusType]);

  return {
    media,
    setMedia,
    isLoading,
    isError,
    skeletonCount,
  };
}
