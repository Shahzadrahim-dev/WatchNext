import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import { useTVShows } from "../hooks/useTVShows";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";

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

  return (
    <>
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

        {isLoading &&
          Array.from({ length: 20 }).map((_, i) => (
            <CardSkeleton key={i} />
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

export default TVShowsPage;
