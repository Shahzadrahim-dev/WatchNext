import { useTrending } from "../hooks/useTrending";
import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import LoadingAnimation from "../components/presentational/LoadingAnimation";
import Error from "../components/presentational/Error";

function TrendingsPage() {
  const { trendings, isLoading, isError } = useTrending();

  return (
    <>
      {isLoading && (
        <div className="flex h-[65vh] items-center justify-center">
          <LoadingAnimation />
        </div>
      )}
      {!isLoading && !isError && (
        <CardGridContainer>
          {trendings?.map((trending) => (
            <MediaCard key={trending.id} media={trending} />
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

export default TrendingsPage;
