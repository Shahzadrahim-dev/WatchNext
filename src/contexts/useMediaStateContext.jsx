import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const MediaStateContext = createContext();

function MediaStateProvider({ children }) {
  const [mediaState, setMediaState] = useState(() => {
    try {
      const item =
        window.localStorage.getItem("mediaStatus");
      return item !== null ? JSON.parse(item) : {};
    } catch (err) {
      console.error(err);
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "mediaStatus",
        JSON.stringify(mediaState),
      );
    } catch (e) {
      console.error(
        "Failed to sync mediaState to localStorage",
        e,
      );
    }
  }, [mediaState]);

  return (
    <MediaStateContext.Provider
      value={{ mediaState, setMediaState }}
    >
      {children}
    </MediaStateContext.Provider>
  );
}

function useMediaStatus() {
  const context = useContext(MediaStateContext);
  if (context === undefined) {
    throw new Error(
      "Error accessing context outside provider",
    );
  }
  return context;
}

export { MediaStateProvider, useMediaStatus };
