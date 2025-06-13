import CardGridContainer from "../components/presentational/CardGridContainer";
import MediaCard from "../components/presentational/MediaCard";
import { useAnimes } from "../hooks/useAnimes";
import LoadingAnimation from "../components/presentational/LoadingAnimation";
import Error from "../components/presentational/Error";
import { useLocation } from "react-router-dom";
import CardSkeleton from "../components/ui/CardSkeleton";

function AnimesPage() {
  const { animes, isLoading, isError } = useAnimes();

  const location = useLocation();

  console.log("animelayout");
  console.log(location);

  return (
    <>
      {isLoading && (
        <CardGridContainer>
          {Array.from({ length: 25 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CardGridContainer>
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
