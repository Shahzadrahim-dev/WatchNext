import youtubePlay from "../assets/youtubePlay.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import exclamation from "../assets/exclamation.svg";
import GenreTag from "../components/presentational/GenreTag";
import Credits from "../components/presentational/Credits";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MediaDetailsPage() {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState(null);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [credits, setCredits] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const token = import.meta.env.VITE_TMDB_API_TOKEN;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    };

    async function fetchDetailsAndTrailer() {
      setIsLoading(true);

      try {
        const [detailRes, videoRes, creditRes] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
              options,
            ),

            fetch(
              `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
              options,
            ),

            fetch(
              `https://api.themoviedb.org/3/movie/${id}/credits`,
              options,
            ),
          ]);

        if (
          !detailRes.ok ||
          !videoRes.ok ||
          !creditRes.ok
        ) {
          throw new Error("One or more fetches failed");
        }

        const [movieData, videosData, creditsData] =
          await Promise.all([
            detailRes.json(),
            videoRes.json(),
            creditRes.json(),
          ]);

        setMovie(movieData);

        const stars = creditsData.cast
          .slice(0, 5)
          .map((actor) => actor.name);

        const producers = creditsData.crew
          .filter((crew) => crew.job === "Producer")
          .map((producer) => producer.name);

        const directors = creditsData.crew
          .filter((crew) => crew.job === "Director")
          .map((person) => person.name);

        const writers = creditsData.crew
          .filter(
            (crew) =>
              crew.job === "Writer" ||
              crew.job === "Screenplay" ||
              crew.job === "Story",
          )
          .map((person) => person.name);

        setCredits({
          stars: stars,
          producers: producers,
          directors: directors,
          writers: writers,
        });

        const trailer = videosData.results.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube",
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Error fetching movie data:",
            error,
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchDetailsAndTrailer();

    return () => {
      controller.abort();
    };
  }, [id]);

  const youtubeThumbnail = `https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`;
  const trailerUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1`;

  return (
    <div className="pb-2 pt-3 px-4">
      {isLoading ? (
        <div>
          <Skeleton className="w-[15%] h-6 rounded-lg bg-gray-800 mb-[.6rem] mt-[.5rem]" />
          <div>
            <Skeleton className="mb-[.7rem] mt-[1px] h-4 w-[10%] bg-gray-800" />
          </div>
          <div className="flex gap-6">
            <Skeleton
              className="w-[214px] h-[315px] rounded-lg bg-gray-800
                shadow-[0px_0px_8.93px_2.21px_rgba(79,79,98,1)]"
            />
            <div className="flex-1">
              <Skeleton
                className="w-full h-[315px] rounded-lg bg-gray-800
                  shadow-[0px_0px_8.93px_2.21px_rgba(79,79,98,1)]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-[1.5rem] font-bold mb-[-3px]">
            {movie?.title
              ? movie.title
              : "Movie Title Unavailable"}
          </h1>
          <div className="mb-[.7rem] mt-[1px]">
            <span className="text-[.8rem] text-[#AAA]">
              {movie?.release_date
                ? movie.release_date.slice(0, 4)
                : "N/A"}
            </span>
            <i
              className="mx-[6px] my-[3px] inline-block h-[4px] w-[4px] rounded-full
                bg-[#666]"
            ></i>
            <span className="text-[.8rem] text-[#AAA]">
              {movie?.original_language
                ? movie.original_language.toUpperCase()
                : "N/A"}
            </span>
            <i
              className="mx-[6px] my-[3px] inline-block h-[4px] w-[4px] rounded-full
                bg-[#666]"
            ></i>
            <span className="text-[.8rem] text-[#AAA]">
              {movie?.runtime ? `${movie.runtime}m` : "N/A"}
            </span>
          </div>
          <div className="flex gap-6">
            <div className="rounded-lg shadow-[0px_0px_8.93px_2.21px_rgba(79,79,98,1)]">
              <img
                src={`${TMDB_IMAGE_BASE}${movie?.poster_path}`}
                alt={movie?.title}
                className="w-[214px] h-[315px] rounded-lg"
              />
            </div>

            <div className="flex-1">
              {trailerKey ? (
                showTrailer ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={trailerUrl}
                    title="Movie Trailer"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="rounded-lg shadow-[0px_0px_8.93px_2.21px_rgba(79,79,98,1)]"
                  />
                ) : (
                  <div
                    className="relative cursor-pointer w-full h-[315px] rounded-lg
                      overflow-hidden
                      shadow-[0px_0px_8.93px_2.21px_rgba(79,79,98,1)]"
                    onClick={() => setShowTrailer(true)}
                  >
                    <img
                      src={youtubeThumbnail}
                      alt="Trailer thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center
                        bg-black/40"
                    >
                      <div className="text-white">
                        <img
                          src={youtubePlay}
                          className="h-13"
                        />
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div
                  className="flex gap-1 justify-center items-center h-[315px]
                    bg-[#101215] rounded-lg"
                >
                  <img src={exclamation} className="h-11" />
                  <p className="text-[1.25rem]">
                    No trailer available.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-[1.7rem] mb-[1.5rem]">
            {movie?.genres?.map((genre) => {
              return (
                <GenreTag
                  key={genre.id}
                  genreName={genre.name}
                  className="border-1 rounded-full px-3 py-[1px] text-[.875rem]
                    border-[#77706B]"
                />
              );
            })}
          </div>

          <div className="w-[60ch]">
            <p>
              {movie?.overview
                ? movie.overview
                : "Overview is unavailable for this movie."}
            </p>
          </div>

          <div className="mt-[1.2rem]">
            <Credits
              credits={credits}
              type="stars"
              singular="Star:"
              plural="Stars:"
            />

            <Credits
              credits={credits}
              type="producers"
              singular="Producer:"
              plural="Producers:"
            />

            <Credits
              credits={credits}
              type="directors"
              singular="Director:"
              plural="Directors: "
            />
            <Credits
              credits={credits}
              type="writers"
              singular="Writer:"
              plural="Writers: "
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaDetailsPage;
