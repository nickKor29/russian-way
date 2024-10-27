import styled, { css } from "styled-components";

const Row = styled.div<{ type?: string; $isMargin?: boolean }>`
  display: flex;
  align-items: center;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      margin-bottom: ${props.$isMargin ? "3rem" : "0"};
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
