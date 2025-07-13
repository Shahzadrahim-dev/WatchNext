import { useTrending } from "../hooks/useTrending";
import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";
import { useGenres } from "../contexts/useGenresContext";
import TopRatedFilterTag from "../components/presentational/TopRatedFilterTag";
import GenresFilterTag from "../components/presentational/GenresFilterTag";

function TrendingsPage() {
  const {
    trendings,
    isLoading,
    isError,
    getNextTrendingsPage,
    isAutoLoad,
    setIsAutoLoad,
  } = useTrending();
  const { setIsTopRatedOn, isTopRatedOn } = useGenres();

  return (
    <>
      <div className="flex justify-end">
        <TopRatedFilterTag
          isTopRatedOn={isTopRatedOn}
          isError={isError}
          setIsTopRatedOn={setIsTopRatedOn}
        />
      </div>

      <CardGridContainer
        hasData={trendings?.length > 0}
        isLoading={isLoading}
        isError={isError}
        onLoadMore={getNextTrendingsPage}
        isAutoLoad={isAutoLoad}
        setIsAutoLoad={setIsAutoLoad}
        margin={true}
      >
        {trendings?.map((trending) => (
          <MediaCard key={trending.id} media={trending} />
        ))}

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

export default TrendingsPage;
