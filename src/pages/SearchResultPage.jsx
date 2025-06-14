import MediaCard from "../components/presentational/MediaCard";
import CardGridContainer from "../components/presentational/CardGridContainer";
import { useSearchMedia } from "../hooks/useSearchMedia";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";
import { useSearch } from "../contexts/useSearchContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SearchResultPage() {
  const { searchMedia, isLoading, isError, hasSearched } =
    useSearchMedia();
  const { searchInput } = useSearch();
  const navigate = useNavigate();

  const showSkeleton =
    isLoading || (!hasSearched && !isError);

  useEffect(() => {
    if (searchInput.trim().length < 3) {
      navigate("/", { replace: true });
    }
  }, [searchInput, navigate]);
  return (
    <>
      {showSkeleton && (
        <CardGridContainer>
          {Array.from({ length: 20 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CardGridContainer>
      )}

      {!isLoading && !isError && (
        <CardGridContainer>
          {searchMedia?.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </CardGridContainer>
      )}

      {hasSearched &&
        !isLoading &&
        !isError &&
        searchMedia.length === 0 && (
          <div className="flex h-[65vh] items-center justify-center text-[1.1rem]">
            <h2>No results found.</h2>
          </div>
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

{
  /* {isLoading && (
        <CardGridContainer>
          {Array.from({ length: 20 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CardGridContainer>
      )}

      {!hasSearched && !isError && (
        <CardGridContainer>
          {Array.from({ length: 20 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CardGridContainer>
      )} */
}
