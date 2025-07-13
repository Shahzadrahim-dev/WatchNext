import { useRecents } from "../contexts/useRecentContext";
import MediaCard from "../components/presentational/MediaCard";
import CardGridContainer from "../components/presentational/CardGridContainer";

function RecentsPage() {
  const { recents } = useRecents();

  return (
    <>
      <CardGridContainer margin={true}>
        {recents.map((recent) => {
          return <MediaCard media={recent} />;
        })}
      </CardGridContainer>
    </>
  );
}

export default RecentsPage;
