import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import PlayIcon from "./PlayIcon";
import unwatchedImg from "../../assets/unwatched.svg";
import watchedImg from "../../assets/watched.svg";
import emptyheart from "../../assets/emptyHeart.svg";
import filledHeart from "../../assets/filledHeart.svg";
import imageUnavailable from "../../assets/imageunavailable.png";
import { cn } from "../../lib/utils";
import { truncateTitle } from "../../utils/truncateTitle";
import { useMediaStatus } from "../../contexts/useMediaStateContext";
const baseUrl = "https://image.tmdb.org/t/p/w300";
import { useNavigate } from "react-router-dom";
import { useRecents } from "../../contexts/useRecentContext";

function MediaCard({
  media,
  setFilteredMedia,
  mediaStatusType = null,
}) {
  const navigate = useNavigate();

  // this checks whether the media is Anime
  const mediaId = media.id ?? media.mal_id;
  const isAnime = !!media.mal_id;

  // this checks whether the media a tv show
  const isTVShow = media?.number_of_seasons ? true : false;

  const { mediaState, setMediaState } = useMediaStatus();
  const { addToRecents } = useRecents();

  const [isWatched, setIsWatched] = useState(() => {
    const stored = JSON.parse(
      localStorage.getItem("mediaStatus"),
    );
    return stored?.[mediaId]?.isWatched ?? false;
  });
  const [isFavorited, setIsFavorited] = useState(() => {
    const stored = JSON.parse(
      localStorage.getItem("mediaStatus"),
    );

    return stored?.[mediaId]?.isFavorited ?? false;
  });
  const [isWatchlisted, setIsWatchlisted] = useState(() => {
    const stored = JSON.parse(
      localStorage.getItem("mediaStatus"),
    );

    return stored?.[mediaId]?.isWatchlisted ?? false;
  });

  useEffect(() => {
    setMediaState((prev) => {
      return {
        ...prev,
        [mediaId]: {
          isWatched,
          isFavorited,
          isWatchlisted,
          isAnime,
          isTVShow,
        },
      };
    });
  }, [
    isWatched,
    isFavorited,
    mediaId,
    setMediaState,
    isWatchlisted,
    isAnime,
    isTVShow,
  ]);

  // generally related
  const rawTitle =
    media.title || media.name || media.title_english;
  const date =
    media.release_date ||
    media.first_air_date ||
    (media.year ? String(media.year) : null);

  const rating =
    Math.ceil((media.vote_average || media.score) * 10) /
    10;

  const poster_path = media.poster_path;
  const releaseDateYear = date?.split("-")[0] || "";

  // anime related
  const anime_poster = media?.images?.jpg?.large_image_url;
  const animeType = media.type;

  // tv show related
  const runtime = media.runtime ? media.runtime : "";
  const number_of_seasons = media.number_of_seasons
    ? media.number_of_seasons
    : "";

  const title = truncateTitle(rawTitle);

  let favorites = null;
  let watched = null;
  let watchlisted = null;

  if (mediaStatusType === "favorites") {
    favorites = true;
    watched = null;
    watchlisted = null;
  } else if (mediaStatusType === "watched") {
    favorites = null;
    watched = true;
    watchlisted = null;
  } else if (mediaStatusType === "watchlisted") {
    favorites = null;
    watched = null;
    watchlisted = true;
  } else if (mediaStatusType === null) {
    favorites = true;
    watched = true;
    watchlisted = true;
  }

  return (
    <li>
      <div
        className="group block cursor-pointer overflow-hidden"
        onClick={() => {
          addToRecents(media);
          navigate(`/${mediaId}`);
        }}
      >
        <div
          className={`relative h-[200px] w-[136px] overflow-hidden rounded-[5px]
            bg-cover bg-center`}
          style={{
            backgroundImage: poster_path
              ? `url(${baseUrl}${poster_path})`
              : anime_poster
                ? `url(${anime_poster})`
                : `url(${imageUnavailable})`,
          }}
        >
          <div>
            <div
              className="bg-[#0b0c0e] h-6 w-6 absolute top-1 right-1 rounded-full
                border-2 border-[#3e4237] flex items-center justify-center
                pt-[1px]"
            >
              <span className="inline-block text-[.6rem] font-bold">
                {Number.isNaN(rating) ? "n/a" : rating}
              </span>
            </div>
            {watched && (
              <img
                src={isWatched ? watchedImg : unwatchedImg}
                className="h-5 absolute bottom-1 right-1 z-2 hover:opacity-80"
                onClick={(e) => {
                  e.stopPropagation();

                  setIsWatched((prev) => !prev);

                  // this is for react state
                  if (setFilteredMedia) {
                    setFilteredMedia((prev) =>
                      prev.filter(
                        (item) =>
                          item.id !== mediaId &&
                          item.mal_id !== mediaId,
                      ),
                    );
                  }

                  // this is for localStorage
                  setMediaState((prev) => {
                    return {
                      ...prev,
                      [mediaId]: {
                        isWatched:
                          !prev[mediaId]?.isWatched,
                        isFavorited,
                        isWatchlisted,
                        isAnime,
                        isTVShow,
                      },
                    };
                  });
                }}
              />
            )}
            {favorites && (
              <img
                src={isFavorited ? filledHeart : emptyheart}
                className="h-5 absolute bottom-1 left-1 z-2 hover:opacity-80"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFavorited((prev) => !prev);

                  if (setFilteredMedia) {
                    setFilteredMedia((prev) =>
                      prev.filter(
                        (item) =>
                          item.id !== mediaId &&
                          item.mal_id !== mediaId,
                      ),
                    );
                  }

                  setMediaState((prev) => {
                    return {
                      ...prev,
                      [mediaId]: {
                        isWatched,
                        isFavorited:
                          !prev[mediaId]?.isFavorited,
                        isWatchlisted,
                        isAnime,
                        isTVShow,
                      },
                    };
                  });
                }}
              />
            )}
            {watchlisted && (
              <Plus
                color="#f9fafc"
                size={20}
                className={cn(
                  `absolute top-1 left-1 z-2 hover:opacity-80 rounded-[5px]
                  py-[1px]`,
                  isWatchlisted
                    ? "bg-[#a90003]"
                    : "bg-[#000]",
                )}
                strokeWidth={3}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsWatchlisted((prev) => !prev);

                  if (setFilteredMedia) {
                    setFilteredMedia((prev) =>
                      prev.filter(
                        (item) =>
                          item.id !== mediaId &&
                          item.mal_id !== mediaId,
                      ),
                    );
                  }

                  setMediaState((prev) => {
                    return {
                      ...prev,
                      [mediaId]: {
                        isWatched,
                        isFavorited,
                        isWatchlisted:
                          !prev[mediaId]?.isWatchlisted,
                        isAnime,
                        isTVShow,
                      },
                    };
                  });
                }}
              />
            )}
          </div>

          {/* Overlay */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "opacity-0 transition-opacity duration-380",
              "group-hover:opacity-100",
              !isWatched && "z-[1]",
            )}
          >
            <PlayIcon height="64px" width="64px" />
          </div>

          {!isWatched && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "bg-black/50",
                "opacity-0 transition-opacity duration-380",
                "group-hover:opacity-100",
              )}
            />
          )}

          <div
            className="absolute inset-0 flex items-center justify-center
              bg-black/50 opacity-0 transition-opacity duration-380"
            style={{
              opacity:
                (isWatched &&
                  mediaStatusType === "watched") ||
                (isWatched && mediaStatusType === null)
                  ? "100"
                  : "0",
            }}
          />
        </div>

        <div>
          <p className="mt-[0.4em] ml-[0.075em] text-[0.8125rem]">
            {title}
          </p>

          <div className="mt-[-4.5px]">
            <span
              className="mr-[0.55em] ml-[0.170em] inline-block rounded border
                border-[#666] px-[0.511em] pt-[0.341em] pb-[0.284em]
                text-[.55rem] leading-[1em] font-semibold text-[#AAAAAA]"
            >
              HD
            </span>
            <span className="text-[0.7rem] text-[#AAA]">
              {releaseDateYear ? releaseDateYear : "N/A"}
            </span>
            <i
              className="mx-[10px] my-[3px] inline-block h-[4px] w-[4px] rounded-full
                bg-[#666]"
            ></i>
            <span className="text-[0.7rem] text-[#AAA]">
              {runtime
                ? `${runtime}m` // If runtime exists
                : number_of_seasons
                  ? `SS ${number_of_seasons}` // Else, if number_of_seasons exists
                  : animeType
                    ? `${animeType}`
                    : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MediaCard;
