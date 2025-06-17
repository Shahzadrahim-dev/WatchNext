import ProtectedRoute from "./ProtectedRoute";
import { useSearch } from "../../contexts/useSearchContext";

function SearchReadyRoute({ children }) {
  const { searchInput, fetchHasStarted } = useSearch();

  return (
    <ProtectedRoute
      check={() =>
        searchInput.trim().length < 3 && !fetchHasStarted
          ? false
          : true
      }
    >
      <>{children}</>
    </ProtectedRoute>
  );
}

export default SearchReadyRoute;
