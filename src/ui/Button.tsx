import styled, { css } from "styled-components";
import { ButtonSize, ButtonVariation } from "../utils/types";

const sizes = {
  [ButtonSize.Small]: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  [ButtonSize.Medium]: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  [ButtonSize.Large]: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  [ButtonVariation.Primary]: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  [ButtonVariation.Secondary]: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  [ButtonVariation.Danger]: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

interface ButtonProps {
  size?: ButtonSize;
  variation?: ButtonVariation;
}

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ size }) => sizes[size || ButtonSize.Medium]}
  ${({ variation }) => variations[variation || ButtonVariation.Primary]}
`;

export default Button;
