import { useMovies } from "../hooks/useMovies";
import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";
import { useGenres } from "../contexts/useGenresContext";
import filmSVG from "../assets/film.svg";
import TopRatedFilterTag from "../components/presentational/TopRatedFilterTag";
import GenresFilterTag from "../components/presentational/GenresFilterTag";

function MoviesPage() {
  const {
    isLoading,
    movieList,
    isError,
    loadNextMoviePage,
    isAutoLoad,
    setIsAutoLoad,
    totalPages,
    page,
  } = useMovies();
  const { setIsTopRatedOn, isTopRatedOn, genre, setGenre } =
    useGenres();

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
        onLoadMore={loadNextMoviePage}
        isLoading={isLoading}
        isError={isError}
        isAutoLoad={isAutoLoad}
        setIsAutoLoad={setIsAutoLoad}
        hasData={movieList?.length > 0}
        isPageLimitExceeded={page === totalPages}
      >
        {movieList?.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}

        {genre?.type === "TV" ||
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

      {genre?.type === "TV" ? (
        <div
          className="flex flex-col h-[55vh] items-center justify-center
            text-[1.1rem]"
        >
          <img src={filmSVG} className="h-25 w-25" />
          <p>{`The ${genre.name} genre is a TV show-specific genre.`}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default MoviesPage;
