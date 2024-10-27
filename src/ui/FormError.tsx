import styled, { css } from "styled-components";

const Error = styled.p<{ $isAvailable?: boolean }>`
  font-size: 1.4rem;
  color: var(--color-red-700);
  margin-bottom: 1rem;
  ${(props) =>
    props.$isAvailable &&
    css`
      margin-bottom: 0;
    `}
`;
export default Error;
