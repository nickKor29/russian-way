import styled, { css } from "styled-components";

const InlineInput = styled.input<{ isEditing?: boolean }>`
  font-size: 1.7rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  transition: all 0.3s
    ${(props) =>
      props.isEditing &&
      css`
        width: 85%;
      `};
`;
export default InlineInput;
