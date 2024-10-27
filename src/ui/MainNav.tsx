import { AiOutlineHome } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import {
  LuArchive,
  LuAward,
  LuMountainSnow,
  LuSettings,
  LuStar,
  LuUsers,
} from "react-icons/lu";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useShrink } from "../context/ToggleSidebarContext";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)<{ $isShrink?: boolean }>`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: ${(props) => (props.$isShrink ? "0" : "1.2rem")};
    justify-content: ${(props) => (props.$isShrink ? "center" : "flex-start")};
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: ${(props) => (props.$isShrink ? "1.2rem" : "1.2rem 2.4rem")};
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  span {
    display: ${(props) => (props.$isShrink ? "none" : "inline")};
    opacity: ${(props) => (props.$isShrink ? "0" : "1")};
    transition: opacity 0.3s;
  }
`;

function MainNav() {
  const { isShrink } = useShrink();
  return (
    <NavList>
      <li>
        <StyledNavLink to="/dashboard" $isShrink={isShrink}>
          <AiOutlineHome />
          <span>Панель</span>
        </StyledNavLink>
      </li>

      <li>
        <StyledNavLink to="/tours" $isShrink={isShrink}>
          <LuMountainSnow />
          <span>Туры</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/participants" $isShrink={isShrink}>
          <LuUsers />
          <span>Участники</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/instructors" $isShrink={isShrink}>
          <LuAward />
          <span>Инструкторы</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/archive" $isShrink={isShrink}>
          <LuArchive />
          <span>Архив</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/reviews" $isShrink={isShrink}>
          <LuStar />
          <span>Отзывы</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/createNewUser" $isShrink={isShrink}>
          <GrUserWorker />
          <span>Пользователи</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/settings" $isShrink={isShrink}>
          <LuSettings />
          <span>Настройки</span>
        </StyledNavLink>
      </li>
    </NavList>
  );
}

export default MainNav;
