import styled from "styled-components";

const InlineTextarea = styled.textarea<{ $color?: string }>`
  font-size: 1.7rem;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  resize: vertical;
  min-height: 12rem;
  line-height: 1.5;
  color: var(--color-grey-800);
  background-color: var(--color-grey-0);

  &:focus {
    border-color: var(--color-brand-500);
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ $color }) =>
        `var(--color-${$color}-900)` || "var(--color-brand-900)"};
  }
`;
export default InlineTextarea;
