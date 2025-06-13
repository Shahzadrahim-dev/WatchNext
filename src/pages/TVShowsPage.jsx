import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import LoadingAnimation from "../components/presentational/LoadingAnimation";
import { useTVShows } from "../hooks/useTVShows";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";

function TVShowsPage() {
  const { tvShows, isLoading, isError } = useTVShows();

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
          {tvShows?.map((tvShow) => {
            return (
              <MediaCard key={tvShow.id} media={tvShow} />
            );
          })}
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

export default TVShowsPage;
