import ProtectedRoute from "./ProtectedRoute";
import { useSearch } from "../../contexts/useSearchContext";

function SearchReadyRoute({ children }) {
  const { searchInput, hasFetchStarted } = useSearch();

  return (
    <ProtectedRoute
      check={() =>
        searchInput.trim().length < 3 && !hasFetchStarted
          ? false
          : true
      }
    >
      <>{children}</>
    </ProtectedRoute>
  );
}

export default SearchReadyRoute;
