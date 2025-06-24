import MediaCard from "../components/presentational/MediaCard";
import CardGridContainer from "../components/presentational/CardGridContainer";
import { useSearchMedia } from "../hooks/useSearchMedia";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";
import { useSearch } from "../contexts/useSearchContext";

function SearchResultPage() {
  const {
    searchMedia,
    isLoading,
    isError,
    getSearchMediaNextPage,
    isAutoLoad,
    setIsAutoLoad,
    totalPages,
    page,
  } = useSearchMedia();
  const { hasSearched, searchInput } = useSearch();

  const showSkeleton =
    isLoading ||
    (!hasSearched &&
      !isError &&
      searchInput.trim().length >= 3);

  return (
    <>
      <CardGridContainer
        onLoadMore={getSearchMediaNextPage}
        isLoading={isLoading}
        isError={isError}
        hasData={searchMedia?.length > 0}
        isAutoLoad={isAutoLoad}
        setIsAutoLoad={setIsAutoLoad}
        isPageLimitExceeded={page === totalPages}
        isSearchValid={searchInput.trim().length >= 3}
      >
        {searchMedia?.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
        {showSkeleton &&
          Array.from({ length: 20 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
      </CardGridContainer>

      {!showSkeleton &&
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
