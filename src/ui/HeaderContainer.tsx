import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  @media (max-width: 1400px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export default HeaderContainer;
