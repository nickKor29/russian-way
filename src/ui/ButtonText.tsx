import styled from "styled-components";

interface ButtonTextProps {
  $color?: string;
  property?: string;
  value?: string;
}

const ButtonText = styled.button<ButtonTextProps>`
  color: ${({ $color }) =>
    $color ? `var(--color-${$color}-600)` : "var(--color-brand-600)"};
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;

  &:active,
  &:hover {
    color: ${({ $color }) =>
      $color ? `var(--color-${$color}-700)` : "var(--color-brand-700)"};
  }

  ${({ property, value }) => property && value && `${property}: ${value};`}
`;

export default ButtonText;
