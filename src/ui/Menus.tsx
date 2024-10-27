import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { LuMoreVertical } from "react-icons/lu";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
const Menu = styled.div<{ $isInTable?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 20;
  ${(props) =>
    props.$isInTable &&
    css`
      position: static;
    `}
`;
interface Position {
  x: number;
  y: number;
}
interface StyledListProps {
  position: Position;
}
const StyledList = styled.ul<StyledListProps>`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  z-index: 1000;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-brand-600);
    transition: all 0.3s;
  }
`;
const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  background-color: var(--color-brand-600);
  &:hover {
    background-color: var(--color-brand-700);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #fff;
  }
`;
interface MenusContextType {
  openId: number | null;
  open: (id: number) => void;
  close: () => void;
  position: Position | null;
  setPosition: (position: Position) => void;
}
const MenusContext = createContext<MenusContextType | undefined>(undefined);

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId(null);
  const open = (id: number) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: number }) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Toggle must be used within a Menus provider");
  const { openId, close, open, setPosition } = context;
  useEffect(() => {
    function handleScroll() {
      if (openId) {
        close();
        document.removeEventListener("wheel", handleScroll);
      }
    }
    if (openId) document.addEventListener("wheel", handleScroll);

    return () => document.removeEventListener("wheel", handleScroll);
  }, [openId, close]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === null || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <LuMoreVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: number; children: ReactNode }) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("List must be used within a Menus provider");
  const { openId, position, close } = context;
  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id) return null;
  if (openId !== id || position === null) return null;
  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
}: {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
}) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Button must be used within a Menus provider");
  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
