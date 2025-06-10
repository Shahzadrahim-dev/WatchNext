import useMovies from "../hooks/useMovies";
import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import LoadingAnimation from "../components/presentational/LoadingAnimation";
import Error from "../components/presentational/Error";

function MoviesPage() {
  const { isLoading, moviesList, isError } = useMovies();

  return (
    <>
      {isLoading && (
        <div className="flex h-[65vh] items-center justify-center">
          <LoadingAnimation />
        </div>
      )}
      {!isLoading && !isError && (
        <CardGridContainer>
          {moviesList?.map((movie) => (
            <MediaCard key={movie.id} media={movie} />
          ))}
        </CardGridContainer>
      )}
      {isError && (
        <div className="flex h-[65vh] items-center justify-center text-[1.1rem]">
          <Error />
        </div>
      )}
    </>
  );
}
export default MoviesPage;
