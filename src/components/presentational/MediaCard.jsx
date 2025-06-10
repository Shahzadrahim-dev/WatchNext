import PlayIcon from "./PlayIcon";
import { truncateTitle } from "../../utils/truncateTitle";
const baseUrl = "https://image.tmdb.org/t/p/w300";

function MediaCard({ media }) {
  const rawTitle = media.title || media.name;
  const date = media.release_date || media.first_air_date;
  const poster_path = media.poster_path;
  const runtime = media.runtime ? media.runtime : "";
  const number_of_seasons = media.number_of_seasons
    ? media.number_of_seasons
    : "";

  const releaseDateYear = date?.split("-")[0] || "N/A";
  const title = truncateTitle(rawTitle);

  return (
    <a className="group block">
      <div
        className={`relative h-[200px] w-[136px] overflow-hidden rounded-[5px]
          bg-cover bg-center`}
        style={{
          backgroundImage: `url(${baseUrl}${poster_path})`,
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center
            bg-black/50 opacity-0 transition-opacity duration-380
            group-hover:opacity-100"
        >
          <PlayIcon height="64px" width="64px" />
        </div>
      </div>

      <div>
        <p className="mt-[0.4em] ml-[0.075em] text-[0.8125rem]">
          {title}
        </p>

        <div className="mt-[-4.5px]">
          <span
            className="mr-[0.4375em] ml-[0.170em] inline-block rounded border
              border-[#666] px-[0.511em] pt-[0.341em] pb-[0.284em]
              text-[.55rem] leading-[1em] font-semibold text-[#AAAAAA]"
          >
            HD
          </span>
          <span className="text-[0.7rem] text-[#AAA]">
            {releaseDateYear}
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
                : ""}
          </span>
        </div>
      </div>
    </a>
  );
}

export default MediaCard;
