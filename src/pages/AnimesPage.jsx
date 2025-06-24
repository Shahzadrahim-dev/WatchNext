import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import { useAnimes } from "../hooks/useAnimes";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";

function AnimesPage() {
  const {
    animes,
    isLoading,
    isError,
    loadNextAnimePage,
    isAutoLoad,
    setIsAutoLoad,
    page,
    totalPages,
  } = useAnimes();

  return (
    <>
      <CardGridContainer
        hasData={animes?.length > 0}
        isLoading={isLoading}
        isError={isError}
        onLoadMore={loadNextAnimePage}
        isAutoLoad={isAutoLoad}
        setIsAutoLoad={setIsAutoLoad}
        isPageLimitExceeded={page === totalPages}
      >
        {animes?.map((anime) => (
          <MediaCard media={anime} />
        ))}
        {isLoading &&
          Array.from({ length: 25 }).map((_, i) => (
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

export default AnimesPage;
