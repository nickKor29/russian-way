import styled from "styled-components";

interface DotProps {
  type: string;
}

const Dot = styled.div<DotProps>`
  width: 30px;
  height: 30px;
  background-color: ${({ type }) =>
    `var(--color-${type}-700)`}; /* Используем пропсы для динамического определения цвета */
`;

export default Dot;
