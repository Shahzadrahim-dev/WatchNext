import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import { useMediaStatusFromLS } from "../hooks/useMediaStatusFromLS";
import CardSkeleton from "../components/ui/CardSkeleton";
import Error from "../components/presentational/Error";
import TopRatedFilterTag from "../components/presentational/TopRatedFilterTag";
import { useGenres } from "../contexts/useGenresContext";

function WatchedPage() {
  const {
    media,
    setMedia,
    isLoading,
    isError,
    skeletonCount,
  } = useMediaStatusFromLS("watched");
  const { setIsTopRatedOn, isTopRatedOn } = useGenres();

  return (
    <>
      <TopRatedFilterTag
        isTopRatedOn={isTopRatedOn}
        isError={isError}
        setIsTopRatedOn={setIsTopRatedOn}
      />
      <CardGridContainer
        hasData={media?.length > 0}
        isError={isError}
        isMediaStatus={true}
      >
        {!isError &&
          !isLoading &&
          media?.map((media) => {
            return (
              <MediaCard
                key={media.id}
                media={media}
                setFilteredMedia={setMedia}
                mediaStatusType="watched"
              />
            );
          })}

        {isLoading &&
          Array.from({ length: skeletonCount }).map(
            (_, i) => (
              <CardSkeleton key={`skeleton-${i}`} />
            ),
          )}
      </CardGridContainer>
      {isError && (
        <div className="flex h-[65vh] items-center justify-center text-[1.1rem]">
          <Error />
        </div>
      )}
    </>
  );
}

export default WatchedPage;
