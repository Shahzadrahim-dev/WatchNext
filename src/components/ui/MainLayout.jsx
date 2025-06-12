import { Outlet } from "react-router-dom";
import Container from "../presentational/Container";
import Header from "./Header";
import { useSearch } from "../../contexts/useSearchContext";
import { useRouteChange } from "../../hooks/useRouteChange";

function MainLayout() {
  const { setSearchInput } = useSearch();

  useRouteChange(function () {
    setSearchInput("");
  }, "/search");

  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default MainLayout;
