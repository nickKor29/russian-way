import styled, { css } from "styled-components";

const Heading = styled.h1.attrs((props) => ({
  id: props.as === "h1" ? "pagination" : undefined, // Устанавливаем id для h1
}))`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
      color: #fff;
    `}

  line-height: 1.4;
`;

export default Heading;
