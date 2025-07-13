import { useState, createContext, useContext } from "react";

const GenresContext = createContext();

function GenresContextProvider({ children }) {
  const [isTopRatedOn, setIsTopRatedOn] = useState(false);
  const [genre, setGenre] = useState();
  const [jaikanGenre, setJaikanGenre] = useState();

  return (
    <GenresContext.Provider
      value={{
        isTopRatedOn,
        setIsTopRatedOn,
        genre,
        setGenre,
        jaikanGenre,
        setJaikanGenre,
      }}
    >
      {children}
    </GenresContext.Provider>
  );
}

function useGenres() {
  const context = useContext(GenresContext);

  if (context === undefined) {
    throw new Error(
      "Error accessing context outside provider",
    );
  }

  return context;
}
export { GenresContextProvider, useGenres };
