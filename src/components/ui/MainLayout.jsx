import { Outlet } from "react-router-dom";

import Container from "../presentational/Container";
import Header from "./Header";
import { useSearch } from "../../contexts/useSearchContext";
import { useRouteChange } from "../../hooks/useRouteChange";
import Footer from "../presentational/Footer";
import { AppSidebar } from "../presentational/AppSidebar";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function MainLayout() {
  const { setSearchInput } = useSearch();

  /* use useMemo here to cache the function because it causes the effect 
to run on each render */
  useRouteChange(function () {
    setSearchInput("");
  }, "/search");

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Container>
          <Header />
          <Outlet />
        </Container>
      </SidebarProvider>
      <Footer />
    </>
  );
}

export default MainLayout;
