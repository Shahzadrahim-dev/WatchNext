import { createContext, useContext, useState } from "react";

const RecentContext = createContext();

function RecentProvider({ children }) {
  const [recents, setRecents] = useState(() => {
    const stored = localStorage.getItem("recents");
    return stored ? JSON.parse(stored) : [];
  });

  function addToRecents(item) {
    setRecents((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      const updated = [item, ...filtered].slice(0, 20);
      localStorage.setItem(
        "recents",
        JSON.stringify(updated),
      );

      return updated;
    });
  }

  return (
    <RecentContext.Provider
      value={{ recents, addToRecents }}
    >
      {children}
    </RecentContext.Provider>
  );
}

function useRecents() {
  const context = useContext(RecentContext);

  if (context === undefined) {
    throw new Error(
      "QuizContext was used outside of the QuizProvider",
    );
  }

  return context;
}

export { useRecents, RecentProvider };
