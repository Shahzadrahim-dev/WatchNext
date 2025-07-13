import MediaCard from "../components/presentational/MediaCard";
import CardGridContainer from "../components/presentational/CardGridContainer";
import { useSearchMedia } from "../hooks/useSearchMedia";
import Error from "../components/presentational/Error";
import CardSkeleton from "../components/ui/CardSkeleton";
import { useSearch } from "../contexts/useSearchContext";
import { useGenres } from "../contexts/useGenresContext";
import filmSVG from "../assets/film.svg";
import TopRatedFilterTag from "../components/presentational/TopRatedFilterTag";

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
  const { setIsTopRatedOn, isTopRatedOn } = useGenres();

  const showSkeleton =
    isLoading ||
    (!hasSearched &&
      !isError &&
      searchInput.trim().length >= 3);

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
        onLoadMore={getSearchMediaNextPage}
        isLoading={isLoading}
        isError={isError}
        hasData={searchMedia?.length > 0}
        isAutoLoad={isAutoLoad}
        setIsAutoLoad={setIsAutoLoad}
        isPageLimitExceeded={page === totalPages}
        isSearchValid={searchInput.trim().length >= 3}
        margin={true}
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
          <div
            className="flex flex-col h-[55vh] items-center justify-center
              text-[1.1rem]"
          >
            <img src={filmSVG} className="h-25 w-25" />
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
