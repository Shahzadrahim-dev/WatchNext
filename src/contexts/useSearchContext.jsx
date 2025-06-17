import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [searchInput, setSearchInput] = useState("");
  const [fetchHasStarted, setFetchHasStarted] =
    useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput,
        hasSearched,
        setHasSearched,
        fetchHasStarted,
        setFetchHasStarted,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined)
    throw new Error(
      "QuizContext was used outside of the QuizProvider",
    );
  return context;
}

export { SearchProvider, useSearch };
