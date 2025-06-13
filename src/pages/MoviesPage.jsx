import { useMovies } from "../hooks/useMovies";
import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import LoadingAnimation from "../components/presentational/LoadingAnimation";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";

function MoviesPage() {
  const { isLoading, movieList, isError } = useMovies();

  return (
    <>
      {isLoading && (
        <CardGridContainer>
          {Array.from({ length: 20 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CardGridContainer>
      )}
      {!isLoading && !isError && (
        <CardGridContainer>
          {movieList?.map((movie) => (
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
