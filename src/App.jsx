import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Navigate } from "react-router-dom";

import MainLayout from "./components/ui/MainLayout";
import AnimesPage from "./pages/AnimesPage";
import MoviesPage from "./pages/MoviesPage";
import TrendingsPage from "./pages/TrendingsPage";
import TVShowsPage from "./pages/TVShowsPage";
import SearchResultPage from "./pages/SearchResultPage";
import { SearchProvider } from "./contexts/useSearchContext";
import CardSkeleton from "./components/ui/CardSkeleton";
import SearchReadyRoute from "./components/routes/SearchReadyRoute";
import FavoritesPage from "./pages/FavoritesPage";
import WatchListedPage from "./pages/WatchListedPage";
import WatchedPage from "./pages/WatchedPage";
import RecentsPage from "./pages/RecentsPage";
import { MediaStateProvider } from "./contexts/useMediaStateContext";
import { GenresContextProvider } from "./contexts/useGenresContext";
import MediaDetails from "./pages/MediaDetails";
import { RecentProvider } from "./contexts/useRecentContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RecentProvider>
                <GenresContextProvider>
                  <MediaStateProvider>
                    <SearchProvider>
                      <MainLayout />
                    </SearchProvider>
                  </MediaStateProvider>
                </GenresContextProvider>
              </RecentProvider>
            }
          >
            <Route
              index
              element={<Navigate to="movies" replace />}
            />

            <Route path="movies" element={<MoviesPage />} />

            <Route
              path="tvshows"
              element={<TVShowsPage />}
            />
            <Route
              path="favorites"
              element={<FavoritesPage />}
            />
            <Route
              path="watched"
              element={<WatchedPage />}
            />
            <Route
              path="watchlisted"
              element={<WatchListedPage />}
            />
            <Route path="anime" element={<AnimesPage />} />
            <Route
              path="trending"
              element={<TrendingsPage />}
            />
            <Route
              path="search"
              element={
                <SearchReadyRoute>
                  <SearchResultPage />
                </SearchReadyRoute>
              }
            />
            <Route path="test" element={<CardSkeleton />} />
            <Route
              path="recent"
              element={<RecentsPage />}
            />
            <Route path="/:id" element={<MediaDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
