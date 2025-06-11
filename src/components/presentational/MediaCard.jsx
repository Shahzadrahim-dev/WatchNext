import { useState } from "react";

import PlayIcon from "./PlayIcon";
import unwatched from "../../assets/unwatched.svg";
import watched from "../../assets/watched.svg";
import emptyheart from "../../assets/emptyHeart.svg";
import filledHeart from "../../assets/filledHeart.svg";

import { truncateTitle } from "../../utils/truncateTitle";
const baseUrl = "https://image.tmdb.org/t/p/w300";

function MediaCard({ media }) {
  const [isWatched, setIsWatched] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  console.log(media);
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

  return (
    <li>
      <a className="group block cursor-pointer">
        <div
          className={`relative h-[200px] w-[136px] overflow-hidden rounded-[5px]
            bg-cover bg-center`}
          style={{
            backgroundImage: poster_path
              ? `url(${baseUrl}${poster_path})`
              : `url(${anime_poster})`,
          }}
        >
          <div>
            <div
              className="bg-[#0b0c0e] h-6 w-6 absolute top-1 right-1 rounded-full
                border-2 border-[#373942] flex items-center justify-center
                pt-[1px]"
            >
              <span className="inline-block text-[.6rem] font-bold">
                {rating}
              </span>
            </div>
            <img
              src={isWatched ? watched : unwatched}
              className="h-5 absolute bottom-1 right-1 z-1 hover:opacity-80"
              onClick={() =>
                setIsWatched((isWatched) => !isWatched)
              }
            />
            <img
              src={isFavorited ? filledHeart : emptyheart}
              className="h-5 absolute bottom-1 left-1 z-1 hover:opacity-80"
              onClick={() =>
                setIsFavorited(
                  (isFavorited) => !isFavorited,
                )
              }
            />
          </div>

          {/* Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center
              bg-black/50 opacity-0 transition-opacity duration-380
              group-hover:opacity-100"
          >
            <PlayIcon height="64px" width="64px" />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center
              bg-black/50 opacity-0 transition-opacity duration-380
              group-hover:opacity-100"
            style={{ opacity: isWatched ? "100" : "0" }}
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
                    : ""}
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}

export default MediaCard;
