import { ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ $bgColor: string }>`
  background-color: ${({ $bgColor }) => $bgColor || "var(--color-orange-500)"};
  color: #fff;
  padding: 1.5rem;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);

  svg {
    width: 3rem;
    height: 3rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;
interface IconWrapperProps {
  bgColor?: string;
  children: ReactElement;
}
function IconWrapper({ children, bgColor }: IconWrapperProps) {
  return <Wrapper $bgColor={bgColor || ""}>{children}</Wrapper>;
}

export default IconWrapper;
