import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: flex-end;
  margin-top: 2rem;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
export default ButtonGroup;
