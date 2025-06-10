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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={<Navigate to="movies" replace />}
            />
            <Route path="movies" element={<MoviesPage />} />
            <Route
              path="tvshows"
              element={<TVShowsPage />}
            />
            <Route path="anime" element={<AnimesPage />} />
            <Route
              path="trending"
              element={<TrendingsPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
