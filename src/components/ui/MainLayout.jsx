import { Outlet } from "react-router-dom";

import Container from "../presentational/Container";
import Header from "./Header";
import { useSearch } from "../../contexts/useSearchContext";
import { useRouteChange } from "../../hooks/useRouteChange";
import Footer from "../presentational/Footer";

function MainLayout() {
  const { setSearchInput } = useSearch();

  /* use useMemo here to cache the function because it causes the effect 
to run on each render */
  useRouteChange(function () {
    setSearchInput("");
  }, "/search");

  return (
    <>
      <Container>
        <Header />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default MainLayout;
