import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import { useTVShows } from "../hooks/useTVShows";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";
import { useGenres } from "../contexts/useGenresContext";
import TopRatedFilterTag from "../components/presentational/TopRatedFilterTag";
import GenresFilterTag from "../components/presentational/GenresFilterTag";
import filmSVG from "../assets/film.svg";

function TVShowsPage() {
  const {
    tvShows,
    isLoading,
    isError,
    loadNextTVShowPage,
    isAutoLoad,
    setIsAutoLoad,
    page,
    totalPages,
  } = useTVShows();
  const { setIsTopRatedOn, isTopRatedOn, genre, setGenre } =
    useGenres();

  console.log(genre);
  return (
    <>
      <div className="flex justify-end">
        <TopRatedFilterTag
          isTopRatedOn={isTopRatedOn}
          isError={isError}
          setIsTopRatedOn={setIsTopRatedOn}
        />
        <GenresFilterTag
          isError={isError}
          genre={genre}
          setGenre={setGenre}
          type={"TMDB: "}
        />
      </div>
      <CardGridContainer
        onLoadMore={loadNextTVShowPage}
        isLoading={isLoading}
        isError={isError}
        hasData={tvShows.length > 0}
        isAutoLoad={isAutoLoad}
        setIsAutoLoad={setIsAutoLoad}
        isPageLimitExceeded={page === totalPages}
      >
        {tvShows?.map((tvShow) => {
          return (
            <MediaCard key={tvShow.id} media={tvShow} />
          );
        })}

        {genre?.type === "Movie" ||
          (isLoading &&
            Array.from({ length: 20 }).map((_, i) => (
              <CardSkeleton key={i} />
            )))}
      </CardGridContainer>

      {isError && (
        <div className="flex h-[65vh] items-center justify-center text-[1.1rem]">
          <Error />
        </div>
      )}

      {genre?.type === "Movie" ? (
        <div
          className="flex flex-col h-[55vh] items-center justify-center
            text-[1.1rem]"
        >
          <img src={filmSVG} className="h-25 w-25" />
          <p>{`The ${genre.name} genre is a movie-specific genre.`}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default TVShowsPage;
