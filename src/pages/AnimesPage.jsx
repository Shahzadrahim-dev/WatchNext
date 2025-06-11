import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import useAnimes from "../hooks/useAnimes";
import LoadingAnimation from "../components/presentational/LoadingAnimation";
import Error from "../components/presentational/Error";

function AnimesPage() {
  const { animes, isLoading, isError } = useAnimes();

  return (
    <>
      {isLoading && (
        <div className="flex h-[65vh] items-center justify-center">
          <LoadingAnimation />
        </div>
      )}
      <CardGridContainer>
        {animes?.data?.map((anime) => (
          <MediaCard media={anime} />
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
