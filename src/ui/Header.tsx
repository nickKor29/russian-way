import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/auth/UserAvatar";
import { LuAlignJustify, LuAlignLeft } from "react-icons/lu";
import ButtonIcon from "./ButtonIcon";
import { useShrink } from "../context/ToggleSidebarContext";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  button {
    margin-right: auto;
    z-index: 9999;
  }
  @media (max-width: 375px) {
    padding: 1.2rem;
  }
`;
function Header() {
  const { isShrink, toggleSidebar } = useShrink();
  console.log(isShrink);
  return (
    <StyledHeader>
      <ButtonIcon onClick={toggleSidebar}>
        {isShrink ? <LuAlignLeft /> : <LuAlignJustify />}
      </ButtonIcon>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
