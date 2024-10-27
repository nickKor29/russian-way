import styled from "styled-components";
import MainNav from "./MainNav";
import FooterNav from "./FooterNav";
import Logo from "./Logo";
import { useShrink } from "../context/ToggleSidebarContext";

const StyledAside = styled.aside<{ $isShrink?: boolean }>`
  height: 100vh;
  width: ${(props) => (props.$isShrink ? "8rem" : "28rem")};
  padding: ${(props) => (props.$isShrink ? "3.2rem 0" : "3.2rem 1.5rem")};
  border-right: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  grid-row: 1/-1;
  transition: all 0.3s ease;
  @media (max-width: 726px) {
    position: absolute;
    left: ${(props) => (props.$isShrink ? "-28rem" : "0")};
    z-index: 1000;
  }
`;

const StyledNav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div<{ $isShrink?: boolean }>`
  padding: 1rem 1rem 0.5rem 1rem;
  display: flex;
  justify-content: ${(props) => (props.$isShrink ? "center" : "space-between")};
  align-items: center;
`;

const NavList = styled.ul`
  flex: 1;
  padding: 3rem 0.75rem;
`;

function Sidebar() {
  const { isShrink } = useShrink();
  return (
    <StyledAside $isShrink={isShrink}>
      <StyledNav>
        <TopSection>
          <Logo />
        </TopSection>
        <NavList>
          <MainNav />
        </NavList>
        <FooterNav />
      </StyledNav>
    </StyledAside>
  );
}

export default Sidebar;
