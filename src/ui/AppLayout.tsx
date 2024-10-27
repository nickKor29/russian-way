import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useShrink } from "../context/ToggleSidebarContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

// Добавляем тип для StyledAppLayout
const StyledAppLayout = styled.div<{ $isSidebarCollapsed: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
      props.$isSidebarCollapsed ? "8rem" : "28rem"} 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  position: relative;
  @media (max-width: 726px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
  overflow: scroll;
  @media (max-width: 430px) {
    padding: 3rem 2rem;
  }
`;

function AppLayout() {
  const { isShrink } = useShrink();
  const [isMobile, setIsMobile] = useState(false);

  return (
    <StyledAppLayout $isSidebarCollapsed={isShrink}>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
