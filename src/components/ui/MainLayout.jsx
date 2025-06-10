import { Outlet } from "react-router-dom";
import Container from "../presentational/Container";
import Header from "./Header";

function MainLayout() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default MainLayout;
