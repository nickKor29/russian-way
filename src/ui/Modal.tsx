import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 999;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;
interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = (name: string) => {
    setOpenName(name);
  };

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }: { children: ReactElement; opens: string }) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Open must be used within a Modal provider");
  const { open } = context;
  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }: { children: ReactElement; name: string }) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Window must be used within a Modal Provider");
  const { openName, close } = context;

  const ref = useOutsideClick<HTMLDivElement>(close);
  if (name !== openName) return null;

  return createPortal(
    <>
      <Overlay />
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
    </>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
