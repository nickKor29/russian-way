import styled, { css } from "styled-components";

const Form = styled.form<{ type: string }>`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      max-width: 100%;
      margin: 0 auto;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

  overflow: hidden;
  font-size: 1.4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.6rem;
    font-size: 1.2rem;
  }
`;

export default Form;
