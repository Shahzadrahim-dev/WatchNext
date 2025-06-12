import MediaCard from "../components/presentational/MediaCard";
import CardGridContainer from "../components/presentational/CardGridContainer";
import { useSearchMedia } from "../hooks/useSearchMedia";
import LoadingAnimation from "../components/presentational/LoadingAnimation";
import Error from "../components/presentational/Error";

function SearchResultPage() {
  const { searchMedia, isLoading, isError } =
    useSearchMedia();

  return (
    <>
      {isLoading && (
        <div className="flex h-[65vh] items-center justify-center">
          <LoadingAnimation />
        </div>
      )}

      {!isLoading && !isError && (
        <CardGridContainer>
          {searchMedia?.map((media) => (
            <MediaCard key={media.id} media={media} />
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

export default SearchResultPage;
