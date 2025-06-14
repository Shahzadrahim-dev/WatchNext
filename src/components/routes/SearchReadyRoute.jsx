import ProtectedRoute from "./ProtectedRoute";
import { useSearch } from "../../contexts/useSearchContext";

function SearchReadyRoute({ children }) {
  const { searchInput } = useSearch();

  return (
    <ProtectedRoute
      check={() => searchInput.trim().length >= 3}
    >
      {children}
    </ProtectedRoute>
  );
}

export default SearchReadyRoute;
