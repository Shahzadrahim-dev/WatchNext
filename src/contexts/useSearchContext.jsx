import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [searchInput, setSearchInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [hasFetchStarted, setHasFetchStarted] =
    useState(false);
  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput,
        hasSearched,
        setHasSearched,
        hasFetchStarted,
        setHasFetchStarted,
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
