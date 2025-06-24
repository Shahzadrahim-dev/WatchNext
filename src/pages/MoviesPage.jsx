import { useMovies } from "../hooks/useMovies";
import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";

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

  return (
    <>
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

        {isLoading &&
          Array.from({ length: 20 }).map((_, i) => (
            <CardSkeleton key={`skeleton-${i}`} />
          ))}
      </CardGridContainer>

      {isError && (
        <div className="flex h-[65vh] items-center justify-center text-[1.1rem]">
          <Error />
        </div>
      )}
    </>
  );
}
export default MoviesPage;
